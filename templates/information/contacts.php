<div class="container information-cont">
    <h1 class="information-header">Контакты</h1>
    <div class="main-contacts">
        <div class="addresses">
            <p>Главный офис находится по адресу:</p>
            <p><span>Семьи шамшиных 55</span></p>
            <br>
            <p><span>Контактные номера:</span></p>
            <p>8 (999) 876 54 32</p>
            <p>8 (999) 123 45 67</p>
        </div>
        <div class="map">

            <div class="two-gis" id="map" ></div>

        </div>
    </div>
</div>

<script type="text/javascript">
    var map;

    DG.then(function () {
        map = DG.map('map', {
            center: [55.04, 82.93],
            zoom: 13
        });

        DG.marker([55.04, 82.93]).addTo(map).bindPopup('Лучший мебельный магазин FRNTR');
    });
</script>