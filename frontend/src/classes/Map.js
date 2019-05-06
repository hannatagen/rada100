import {Map as OlMap, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Overlay from 'ol/Overlay';
import Geolocation from 'ol/Geolocation';
import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';
import * as proj from 'ol/proj';
// import * as olExtent from 'ol/extent';
import Circle from 'ol/geom/Circle';
import Point from 'ol/geom/Point';
// import { getLength } from 'ol/sphere';

import {defaults as defaultControls} from 'ol/control';
import MapStyles from './MapStyles';
import MapUtils from './MapUtils';
import store from '../store/store';
import {AXIOS} from '../components/http-common'


export default class Map {
    constructor() {
        this.adminMap = store.state.adminMap;
        if (!this.adminMap) {
            this.geolocation = null;
            this.trackingOn = false;
            this.location = false;
            this.pointsList = [];
            this.trailsList = [];
            AXIOS.get('/api/trails/')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.trailsList = response.data;
                })
                .catch(error => {
                    console.log(error)
                });
            this.playingTrailID = store.state.playingTrail;

            this.trailFeaturesObject = {};
            this.pointsAndTrails = {};
            this.trailFeaturesArray = [];
            this.format = new GeoJSON();
            this.extent = [2256311.733318761, 7860193.197535333, 3340960.9706381336, 8447281.118052645];
            this.gameStarted = store.state.playing;
            this.initVectorLayers();
            this.initMap();
            this.accuracyFeature = null;
            this.positionFeature = null;
            this.selectedTrailFeatures = null;
            this.locationcoordinates = null;

            this.visitedPointsObject = {};
        } else {
            this.constructorAdmin();
        }
    }

    constructorAdmin() {
        this.adminMap = true;
        this.adminAddPointLayer = [];
        this.pointsList = [];
        this.modifyTrailId = store.state.modifyTrailId;
        if (this.modifyTrailId) {
            AXIOS.get('/api/trails/' + this.modifyTrailId + '/points')
                .then(response => {
                    // JSON responses are automatically parsed.
                    this.pointsList = response.data;
                })
                .catch(error => {
                    console.log(error)
                });
        }
        this.trailFeaturesArray = [];
        this.format = new GeoJSON();
        this.extent = [2256311.733318761, 7860193.197535333, 3340960.9706381336, 8447281.118052645];
        this.initAdminVectorLayers();
        this.initTrailPoints(this.pointsList, null);
        this.initMap();
        this.accuracyFeature = null;
        this.positionFeature = null;
        this.locationcoordinates = null;
    }

    initAdminVectorLayers() {
        this.adminAddPointLayer = new VectorLayer({
            map: this.map,
            source: new VectorSource({
                features: [],
                wrapX: false,
            }),
            style: MapStyles.markerStyle,
        });
    }

    initVectorLayers() {
        this.vectorLayer = new VectorLayer({
            map: this.map,
            source: new VectorSource({
                features: [],
                wrapX: false,
            }),
            style: MapStyles.markerStyle,
        });
        this.locationLayer = new VectorLayer({
            map: this.map,
            source: new VectorSource({
                features: [],
                wrapX: false,
            }),
        });
        // use a single feature with a linestring geometry to display our track
        this.trackFeature = new Feature({
            geometry: new LineString([]),
        });
        // we'll need a vector layer to render it
        this.trackLayer = new VectorLayer({
            source: new VectorSource({
                features: [this.trackFeature],
            }),
            style: MapStyles.trackStyle,
        });
    }

    initTrailPoints(pointsList, isPlaying) {
        this.pointsList = pointsList;
        for (let i = 0; i < pointsList.length; i += 1) {
            const trailID = JSON.parse(pointsList[i].trailId);
            const lon = parseFloat(pointsList[i].longitude);
            const lat = parseFloat(pointsList[i].latitude);
            const coords = [lon, lat];
            const coordinates = proj.fromLonLat(coords);
            const feature = new Feature({
                geometry: new Point(coordinates),
                trailId: trailID,
                name: pointsList[i].name,
            });
            feature.setId(pointsList[i].pointId);
            this.trailFeaturesArray.push(feature);
            if (trailID in this.trailFeaturesObject) {
                this.trailFeaturesObject[trailID].push(feature);
            } else {
                this.trailFeaturesObject[trailID] = [feature];
            }
        }

        this.gameStarted = isPlaying;
        if (isPlaying) {
            this.selectedTrailFeatures = this.trailFeaturesObject[this.playingTrailID];
            this.startPlaying();
        } else {
            this.vectorLayer.getSource()
                .clear();
            this.vectorLayer.getSource()
                .addFeatures(this.trailFeaturesArray);
            MapUtils.resetMapMarkers(this.vectorLayer);
        }
    }


    initMap() {
        this.popupContainer = document.getElementById('popup');
        this.overlay = new Overlay({
            element: this.popupContainer,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -50],
        });
        const raster = new TileLayer({
            source: new OSM(),
        });
        const layerList = [raster, this.vectorLayer, this.locationLayer, this.trackLayer];
        if (this.adminMap) layerList.push(this.adminAddPointLayer);
        this.map = new OlMap({
            layers: layerList,
            target: document.getElementById('map'),
            controls: defaultControls({
                attributionOptions: {
                    collapsible: false,
                },
                zoom: true,
            }),
            overlays: [this.overlay],
            view: new View({
                maxZoom: 19,
                zoom: 8,
                minZoom: 6,
            }),
        });
        // center the map to Estonia
        this.map.getView()
            .fit(this.extent, this.map.getSize());
        this.handleMapClick();
        this.map.updateSize();
        this.map.on('pointermove', (e) => {
            const pixel = this.map.getEventPixel(e.originalEvent);
            const hit = this.map.hasFeatureAtPixel(pixel);
            this.map.getViewport().style.cursor = hit ? 'pointer' : '';
        });
        // MapUtils.closeFooter(this.map, this.extent, this.overlay,
        //   this.trailFeaturesArray, this.vectorLayer);
        // this.gameStarted = MapUtils.startGame(this.map, this.extent, this.overlay,
        //   this.selectedTrailFeatures, this.vectorLayer);
    }

    handleMapClick() {
        if (this.adminMap) {
            this.map.on('click', (evt) => {
                this.adminAddPointLayer = [];
                var coordinate = evt.coordinate;
                var hdms = toStringHDMS(toLonLat(coordinate));
                this.overlay.setPosition(undefined);
                MapUtils.resetMapMarkers(this.adminAddPointLayer);
            });
        } else {
            this.map.on('click', (evt) => {
                this.overlay.setPosition(undefined);
                MapUtils.resetMapMarkers(this.vectorLayer);
                // eslint-disable-next-line no-unused-vars
                const clickedFeature = this.map.forEachFeatureAtPixel(evt.pixel,
                    // eslint-disable-next-line no-unused-vars
                    (feature, layer) => {
                        // eslint-disable-next-line
                        if (this.locationLayer === layer) {
                        } else {
                            const featureClicked = feature;
                            this.handleSelectedTrail(featureClicked, null)
                        }
                    });
            });
        }
    }

    handleSelectedTrail(featureClicked, selectedTrailId) {
        if (selectedTrailId !== null) {
            console.log(this.trailFeaturesObject);
            featureClicked = this.trailFeaturesObject[selectedTrailId][0];
            console.log(featureClicked);
        }
        document.getElementById('map').style.bottom = '195px';

        document.getElementById('infoWindow').style.visibility = 'unset';
        this.map.updateSize();
        this.vectorLayer.getSource()
            .clear();

        store.commit('setPlayingId', featureClicked.get('trailId'));
        this.playingTrailID = featureClicked.get('trailId');
        console.log('playingTrailID clickmeetodis',this.playingTrailID);
        this.selectedTrailFeatures = this.trailFeaturesObject[featureClicked.get('trailId')];
        this.vectorLayer.getSource()
            .addFeatures(this.selectedTrailFeatures);

        const extent = this.vectorLayer.getSource()
            .getExtent();

        this.map.getView()
            .fit(extent, this.map.getSize());

        this.map.getView()
            .setZoom(this.map.getView()
                .getZoom() - 1);
        MapUtils.resetMapMarkers(this.vectorLayer);
        MapUtils.setVisitedMarker(this.visitedPointsObject.visited)
        const selectedFeature = this.vectorLayer.getSource()
            .getFeatureById(
                featureClicked.getId());
        selectedFeature.setStyle(MapStyles.selectedMarkerStyle);

        const totalTrailPoints = this.vectorLayer.getSource()
            .getFeatures().length;

        const trail = this.trailsList.filter(
            // eslint-disable-next-line eqeqeq
            object => object.trailId === featureClicked.get('trailId'));
        const point = this.pointsList.filter(
            // eslint-disable-next-line eqeqeq
            object => object.pointId === featureClicked.getId());

        const trailName = trail[0].name;
        const selectedPointName = point[0].name;
        const coordinate = MapUtils.getPopupCoordinates(selectedFeature, selectedPointName);
        if (!this.gameStarted) {
            MapUtils.openFooter(totalTrailPoints, trailName, false);
            this.overlay.setPosition(coordinate);
        } else {
            const pointDescription = point[0].description;
            MapUtils.openFooter(pointDescription, selectedPointName, true);
        }
    }

    toggleLocation() {
        if (this.trackingOn) {
            this.centerLocation();
        } else {
            this.initLocation();
        }
    }

    initLocation() {
        this.geolocation = null;
        this.geolocation = new Geolocation({
            tracking: true,
            trackingOptions: {
                enableHighAccuracy: true,
            },
            projection: 'EPSG:3857',
        });
        // console.log(this.geolocation);
        // this.geolocation.bindTo('projection', this.map.getView());
        this.accuracyFeature = new Feature();
        this.positionFeature = new Feature();
        this.locationLayer.getSource()
            .addFeature(this.positionFeature);
        this.locationLayer.getSource()
            .addFeature(this.accuracyFeature);
        this.positionFeature.setStyle(MapStyles.positionStyle);
        this.accuracyFeature.setStyle(MapStyles.accuracyStyle);

        this.geolocation.once('change', () => {
            const coordinates = this.geolocation.getPosition();
            this.map.getView()
                .setCenter(coordinates);
            this.map.getView()
                .setZoom(14);
            this.trackingOn = true;
        });
        this.geolocation.on('change', () => {
            const coordinates = this.geolocation.getPosition();
            const accuracy = this.geolocation.getAccuracy();
            this.positionFeature.setGeometry(coordinates ?
                new Point(coordinates) : null);
            this.accuracyFeature.setGeometry(coordinates ?
                new Circle(coordinates, accuracy) : null);
            this.locationcoordinates = coordinates;
        });
        this.geolocation.setTracking(true);
        this.location = true;
    }

    centerLocation() {
        const coordinates = this.geolocation.getPosition();
        this.map.getView()
            .setCenter(coordinates);
        this.map.getView()
            .setZoom(14);
    }

    disableLocation() {
        this.trackingOn = null;
        this.geolocation.setTracking(false);
        this.geolocation.un('change:position', this.changeOn);
        this.geolocation.un('change:position', this.changeOnce);
        this.vectorLayer.getSource()
            .removeFeature(this.positionFeature);
        this.vectorLayer.getSource()
            .removeFeature(this.accuracyFeature);
        this.positionFeature = 0;
        this.accuracyFeature = 0;
        this.geolocation = 0;
        this.trackingOn = false;
    }

    closeFooter() {
        this.map.updateSize();
        this.vectorLayer.getSource()
            .clear();
        this.vectorLayer.getSource()
            .addFeatures(this.trailFeaturesArray);
        MapUtils.resetMapMarkers(this.vectorLayer);
        this.overlay.setPosition(undefined);
        this.map.getView()
            .fit(this.extent, this.map.getSize());
    }

    startPlaying() { //TODO visited markerid teist värvi (requestida andmebaasist hetkel sisse logitud kasutajaid järgi)
        /** axios template
         AXIOS.get('/api/games/' + this.playingTrailID, {}, { headers: {
                Authorization: store.state.loggedInToken,
                'Content-Type': 'application/json',
            }}).then(request => {
        }).catch(error => {
            console.log(error)
        });
         */
        console.log('playingTrailID startplayingmeetodis' ,this.playingTrailID);

        AXIOS.get('/api/games/' + this.playingTrailID + '/ended', {
            headers: {
                Authorization: store.state.loggedInToken,
                'Content-Type': 'application/json',
            }
        }).then(request => {
            console.log('kas rada läbitud??? ', request);
            console.log(request.data)
            if (request.data === false) {
                store.commit('changePlaying', true);
                AXIOS.get('/api/games/' + this.playingTrailID + '/started', {
                    headers: {
                        Authorization: store.state.loggedInToken,
                        'Content-Type': 'application/json',
                    }
                }).then(request => {
                    if (request.data === false) {
                        AXIOS.post('/api/games/' + this.playingTrailID, {}, {
                            headers: {
                                Authorization: store.state.loggedInToken,
                                'Content-Type': 'application/json',
                            }
                        })
                            .then(request => {
                                console.log(request);
                                this.visitPointsPlaying();
                            })
                            .catch(error => {
                                console.log(error)
                            });
                    } else {
                        this.visitPointsPlaying();
                    }
                }).catch(error => {
                    console.log(error)
                });

            } else {
                this.closeFooter();
            }}).catch(error => {
            console.log(error)
        });
    }


    visitPointsPlaying() {
        AXIOS.get('/api/games/' + this.playingTrailID, {}, {
            headers: {
                Authorization: store.state.loggedInToken,
                'Content-Type': 'application/json',
            }
        }).then(request => {
            const visitedPoints = request.data;
            this.visitedPointsObject = MapUtils.getVisitedAndNotVisitedPoints(this.selectedTrailFeatures, visitedPoints);
            this.gameStarted = true;
            this.map.updateSize();
            this.vectorLayer.getSource()
                .clear();
            this.vectorLayer.getSource()
                .addFeatures(this.selectedTrailFeatures);
            MapUtils.resetMapMarkers(this.vectorLayer);
            MapUtils.setVisitedMarker(this.visitedPointsObject.visited);

            this.overlay.setPosition(undefined);
            if (!this.location) {
                this.initLocation();
            }
            const extent = this.vectorLayer.getSource()
                .getExtent();
            this.map.getView()
                .fit(extent, this.map.getSize());
            this.map.getView()
                .setZoom(this.map.getView()
                    .getZoom() - 1);
        }).catch(error => {
            console.log(error)
        });
    }

    pausePlaying() {
        this.gameStarted = false;
        this.closeFooter();
    }

    closeGameFooter() {
        this.map.updateSize();
        this.vectorLayer.getSource()
            .clear();
        this.vectorLayer.getSource()
            .addFeatures(this.selectedTrailFeatures);
        MapUtils.resetMapMarkers(this.vectorLayer);
        MapUtils.setVisitedMarker(this.visitedPointsObject.visited);
        this.overlay.setPosition(undefined);
        const extent = this.vectorLayer.getSource()
            .getExtent();
        this.map.getView()
            .fit(extent, this.map.getSize());
        this.map.getView()
            .setZoom(this.map.getView()
                .getZoom() - 1);
    }


    pointNearFeature(point1) {
        const coordinates = point1.getPosition();
        // teeme nähtamatu ringi, mille abil vaadata kas koordinaadid lõikuvad
        const bufferCircle = new Feature(new Circle(coordinates, 120)); // TODO change distance
        bufferCircle.setStyle(MapStyles.circleStyle);
        this.locationLayer.getSource().addFeature(bufferCircle);
        // Võrdleme geomeetriaid
        const circleGeometry = bufferCircle.getGeometry();
        let intersected = false;
        for (let i = 0; i < this.vectorLayer.getSource().getFeatures().length; i += 1) {
            const featureOnMap = this.vectorLayer.getSource().getFeatures()[i];
            if (this.visitedPointsObject.notVisited.indexOf(featureOnMap) > -1) {
                const coords = featureOnMap.getGeometry().getCoordinates();
                intersected = circleGeometry.intersectsCoordinate(coords);
                // eslint-disable-next-line
                if (intersected) {
                    const arrivedPointID = featureOnMap.getId();
                    AXIOS.post('/api/games/point/' + arrivedPointID, {}, {
                        headers: {
                            Authorization: store.state.loggedInToken,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {
                        const feature = this.visitedPointsObject.notVisited.filter(
                            object => object.getId() == featureOnMap.getId());
                        const index = this.visitedPointsObject.notVisited.indexOf(feature[0]);
                        if (index > -1) {
                            this.visitedPointsObject.notVisited.splice(index, 1);
                            this.visitedPointsObject.visited.push(featureOnMap);
                            if (this.visitedPointsObject.notVisited.length === 0) {
                                this.endGame();
                            }
                        }
                        featureOnMap.setStyle(MapStyles.visitedMarkerStyle);
                    }).catch(error => {
                        console.log(error)
                    });

                    return intersected;
                    // pärast return lauset avaneb taski tegemise võimalus.
                }
            }
        }
        return false;
    }


    getAllPossiblePoints() {
        return this.selectedTrailFeatures.length
    }

    getUserCurrentPoints() {
        AXIOS.get('/api/games/' + this.playingTrailID, {
            headers: {
                Authorization: store.state.loggedInToken,
                'Content-Type': 'application/json',
            }
        }).then(request => {
            const visitedPoints = request.data;
            const visitedPointsObject = MapUtils.getVisitedAndNotVisitedPoints(this.selectedTrailFeatures, visitedPoints);
            if (visitedPointsObject.visited != null) {
                return visitedPointsObject.visited.length
            }
            else return 0;


        }).catch(error => {
            console.log(error)
        });
    }

    endGame() {
        store.commit('setFinishTrail', true);
        AXIOS.get('/api/games/' + this.playingTrailID + '/ended', {}, {
            headers: {
                Authorization: store.state.loggedInToken,
                'Content-Type': 'application/json',
            }
        }).then(request => {
            MapUtils.setFinishedTrailMarkerStyle(this.visitedPointsObject.visited);
        }).catch(error => {
            console.log(error)
        });
        // TODO enam seda rada mängida ei saa? -> hetkel on nii, et ei saa
    }
}
