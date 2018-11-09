import { Map as OlMap, View } from 'ol';
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

import { defaults as defaultControls } from 'ol/control';
import pointsData from '../data/pointsData';
import trailsData from '../data/trailsData';
import MapStyles from './MapStyles';
import MapUtils from './MapUtils';
import store from '../store/store';


export default class Map {
    constructor() {
        this.geolocation = null;
        this.trackingOn = false;
        this.location = false;

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

    initTrailPoints(trailsList, isPlaying) {
        for (let i = 0; i < pointsData.length; i += 1) {
            const trailID = JSON.parse(pointsData[i].trail_id);
            const lon = parseFloat(pointsData[i].lon);
            const lat = parseFloat(pointsData[i].lat);
            const coords = [lon, lat];
            const coordinates = proj.fromLonLat(coords);
            const feature = new Feature({
                geometry: new Point(coordinates),
                trail_id: trailID,
                name: pointsData[i].name,
            });
            feature.setId(pointsData[i].point_id);
            this.trailFeaturesArray.push(feature);
            if (trailID in this.trailFeaturesObject || i in this.pointsAndTrails) {
                this.trailFeaturesObject[trailID].push(this.trailFeaturesArray[pointsData[i].point_id]);
            } else {
                this.trailFeaturesObject[trailID] = [this.trailFeaturesArray[pointsData[i].point_id]];
            }
        }


        console.log('raja ID, millel hetkel mängib: ', store.state.playingTrail);

        this.gameStarted = isPlaying;
        if (isPlaying) {
            this.selectedTrailFeatures = this.trailFeaturesObject[this.playingTrailID];
            this.startPlaying();
        } else {
            console.log('andmebaasist trailstList', trailsList);
            console.log('hardcoded failist pointsdata', pointsData);

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
        this.map = new OlMap({
            layers: [raster, this.vectorLayer, this.locationLayer, this.trackLayer],
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
                        document.getElementById('map').style.bottom = '195px';

                        document.getElementById('infoWindow').style.visibility = 'unset';
                        this.map.updateSize();
                        this.vectorLayer.getSource()
                            .clear();

                        store.commit('setPlayingId', feature.get('trail_id'));
                        this.selectedTrailFeatures = this.trailFeaturesObject[feature.get('trail_id')];
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

                        const selectedFeature = this.vectorLayer.getSource()
                            .getFeatureById(
                                feature.getId());
                        selectedFeature.setStyle(MapStyles.selectedMarkerStyle);

                        const totalTrailPoints = this.vectorLayer.getSource()
                            .getFeatures().length;
                        const trailName = trailsData[feature.get('trail_id')].name;
                        const selectedPointName = pointsData[feature.getId()].name;
                        const coordinate = MapUtils.getPopupCoordinates(selectedFeature, selectedPointName);
                        if (!this.gameStarted) {
                            MapUtils.openFooter(totalTrailPoints, trailName, false);
                            this.overlay.setPosition(coordinate);
                        } else {
                            const pointDescription = pointsData[feature.getId()].description;
                            MapUtils.openFooter(pointDescription, selectedPointName, true);
                        }
                    }
                });
        });
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

    startPlaying() {
        this.gameStarted = true;
        this.map.updateSize();
        this.vectorLayer.getSource()
            .clear();
        this.vectorLayer.getSource()
            .addFeatures(this.selectedTrailFeatures);
        MapUtils.resetMapMarkers(this.vectorLayer);
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
        // eslint-disable-next-line
        console.log('sa asud praegu siin: ', coordinates);
        // eslint-disable-next-line
        console.log('kõik raja punktid', this.selectedTrailFeatures);
        // teeme nähtamatu ringi, mille abil vaadata kas koordinaadid lõikuvad
        const bufferCircle = new Feature(new Circle(coordinates, 4000)); // TODO change distance
        bufferCircle.setStyle(MapStyles.circleStyle);
        this.locationLayer.getSource().addFeature(bufferCircle);
        // Võrdleme geomeetriaid
        const circleGeometry = bufferCircle.getGeometry();
        let intersected = false;
        for (let i = 0; i < this.vectorLayer.getSource().getFeatures().length; i += 1) {
            const featureOnMap = this.vectorLayer.getSource().getFeatures()[i];
            const coords = featureOnMap.getGeometry().getCoordinates();
            intersected = circleGeometry.intersectsCoordinate(coords);
            // eslint-disable-next-line
            console.log('ristus kaardil oleva raja punktiga: ',intersected);
            if (intersected) {
                //TODO jõudis sellesse punkti, saab punkti selle eest
                console.log(pointsData[featureOnMap.getId()]);
                // pärast return lauset avaneb taski tegemise võimalus.
                return intersected;
            }
        }
        return false;
    }
}
