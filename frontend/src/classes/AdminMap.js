import {Map as OlMap, toLonLat, toStringHDMS, View} from 'ol';
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


export default class AdminMap {
    constructor() {
        this.geolocation = null;
        this.location = false;
        this.pointsList = [];
        this.trailsList = [];
        this.addPointLayer = [];
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
        this.trailFeaturesObject = {};
        this.trailFeaturesArray = [];
        this.format = new GeoJSON();
        this.extent = [2256311.733318761, 7860193.197535333, 3340960.9706381336, 8447281.118052645];
        this.initVectorLayers();
        this.initMap();
    }

    initVectorLayers() {
        this.addPointLayer = new VectorLayer({
            map: this.map,
            source: new VectorSource({
                features: [],
                wrapX: false,
            }),
            style: MapStyles.markerStyle,
        });
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
    }

    initTrailPoints(pointsList) {
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

        this.vectorLayer.getSource()
            .clear();
        this.vectorLayer.getSource()
            .addFeatures(this.trailFeaturesArray);
        MapUtils.resetMapMarkers(this.vectorLayer);
    }


    initMap() {
        const raster = new TileLayer({
            source: new OSM(),
        });
        const layerList = [raster, this.vectorLayer, this.locationLayer, this.addPointLayer];
        this.map = new OlMap({
            layers: layerList,
            target: document.getElementById('adminMap'),
            controls: defaultControls({
                attributionOptions: {
                    collapsible: false,
                },
                zoom: true,
            }),
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
    }

    handleMapClick() {
        this.map.on('click', (evt) => {
            this.trailFeaturesArray = [];
            const coordinate = evt.coordinate;
            const coordsList = [coordinate[0],coordinate[1]];

            const feature = new Feature({
                geometry: new Point(coordsList),
            });
            feature.setId(9999999);
            this.trailFeaturesArray.push(feature);
            this.vectorLayer.getSource().clear();
            this.vectorLayer.getSource()
                .addFeatures(this.trailFeaturesArray);
            MapUtils.resetMapMarkers(this.vectorLayer);
            store.commit('setNewPointLonLat', coordinate);
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
}
