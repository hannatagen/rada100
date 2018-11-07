import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';

export default {
    markerStyle: new Style({
        image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_blue.png',
        }),
    }),
    selectedMarkerStyle: new Style({
        image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: 'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green.png',
        }),
    }),
    positionStyle: new Style({
        image: new CircleStyle({
            radius: 6,
            fill: new Fill({
                color: '#3399CC',
            }),
            stroke: new Stroke({
                color: '#fff',
                width: 2,
            }),
        }),
    }),
    accuracyStyle: new Style({
        fill: new Fill({
            color: 'rgba(150, 153, 245, 0.25)',
        }),
        stroke: new Stroke({
            color: 'rgba(25, 70, 110, 0.75)',
        }),
    }),
    trackStyle: new Style({
        stroke: new Stroke({
            color: 'rgba(0,0,255,1.0)',
            width: 3,
            lineCap: 'round',
        }),
    }),
    circleStyle: new Style({
        fill: new Fill({
            color: 'rgba(0,0,0,0)',
        }),
        stroke: new Stroke({
            color: 'rgba(0,0,0,0)',
        }),
    }),
};