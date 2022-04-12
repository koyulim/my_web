/*global kakao*/
import React, { useEffect } from 'react'

const Location = () => {

    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3
        };

        var map = new kakao.maps.Map(container, options);

        navigator.geolocation.getCurrentPosition(function (position) {

            var lat = position.coords.latitude,
                lon = position.coords.longitude;

            var locPostion = new kakao.maps.LatLng(lat, lon)
            var marker = new kakao.maps.Marker({
                map: map,
                position: locPostion
            });
            map.setCenter(locPostion);

            kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

                var latlng = mouseEvent.latLng;
                marker.setPosition(latlng);

                // var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
                // message += '경도는 ' + latlng.getLng() + ' 입니다';

                // var resultDiv = document.getElementById('clickLatlng'); 
                // resultDiv.innerHTML = message;
            });
        });
    }, [])

    return (
        <div>
            <div id="map" style={{ width: "300px", height: "200px" }}></div>
        </div>
    )
}

export default Location;