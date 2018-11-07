import MapStyles from './MapStyles';

export default class MapUtils {
    static resetMapMarkers(vectorLayer) {
        const features = vectorLayer.getSource().getFeatures();
        // eslint-disable-next-line
        for (const feature in features) {
            (features[feature]).setStyle(MapStyles.markerStyle);
        }
    }

    static openFooter(totalTrailPoints, trailNameString, isPlaying) {
        if (isPlaying) {
            const pointDescription = document.getElementById('pointDescription');
            const pointName = document.getElementById('pointName');
            pointDescription.innerHTML = totalTrailPoints;
            pointName.innerHTML = trailNameString;
        } else {
            const trailName = document.getElementById('trailName');
            const totalPoints = document.getElementById('totalPoints');
            trailName.innerHTML = trailNameString;
            totalPoints.innerHTML = totalTrailPoints;
        }
    }

    static getPopupCoordinates(selectedFeature, selectedPointName) {
        const popupContent = document.getElementById('popup-content');
        const coordinate = selectedFeature.getGeometry()
            .getCoordinates();
        popupContent.innerHTML = `<p class="font-weight-bold">Raja punkt:</p>${selectedPointName}`;
        return coordinate;
    }
}