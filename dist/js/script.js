document.addEventListener("DOMContentLoaded", function () {

    const kittiesBase = [
        {
            "id": 1,
            "name": "simon",
            "category": "fast",
            "price": 100,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495636.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.179Z",
            "updated_at": "2018-02-06T23:08:49.179Z",
            "bg_color": "#d3e8ff"
        },
        {
            "id": 2,
            "name": "felix",
            "category": "fast",
            "price": 10000,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495625.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.186Z",
            "updated_at": "2018-02-06T23:08:49.186Z",
            "bg_color": "#fae1ca"
        },
        {
            "id": 3,
            "name": "luna",
            "category": "slow",
            "price": 2000,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495622.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.190Z",
            "updated_at": "2018-02-06T23:08:49.190Z",
            "bg_color": "#dbf0d0"
        },
        {
            "id": 4,
            "name": "oliver",
            "category": "fast",
            "price": 9000,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495619.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.193Z",
            "updated_at": "2018-02-06T23:08:49.193Z",
            "bg_color": "#dfdffa"
        },
        {
            "id": 5,
            "name": "oreo",
            "category": "middle",
            "price": 100,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495616.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.197Z",
            "updated_at": "2018-02-06T23:08:49.197Z",
            "bg_color": "#ffe0e5"
        },
        {
            "id": 6,
            "name": "molly",
            "category": "slow",
            "price": 3000,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495613.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.201Z",
            "updated_at": "2018-02-06T23:08:49.201Z",
            "bg_color": "#ede2f5"
        },
        {
            "id": 7,
            "name": "simba",
            "category": "fast",
            "price": 11000,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495592.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.205Z",
            "updated_at": "2018-02-06T23:08:49.205Z",
            "bg_color": "#d1eeeb"
        },
        {
            "id": 8,
            "name": "jack",
            "category": "middle",
            "price": 5000,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495579.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.209Z",
            "updated_at": "2018-02-06T23:08:49.209Z",
            "backg_color": "#eee9e8"
        },
        {
            "id": 10,
            "name": "loki",
            "category": "fast",
            "price": 20000,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/336916.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.216Z",
            "updated_at": "2018-02-06T23:08:49.216Z",
            "bg_color": "#d3e8ff"
        },
        {
            "id": 11,
            "name": "milo",
            "category": "slow",
            "price": 3500,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/336916.svg",
            "available": true,
            "created_at": "2018-02-06T23:08:49.220Z",
            "updated_at": "2018-02-06T23:08:49.220Z",
            "bg_color": "#dbf0d0"
        },
        {
            "id": 13,
            "name": "Homer",
            "category": "sub-zero",
            "price": 91233,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/117910.svg",
            "available": true,
            "created_at": "2018-02-10T10:40:52.425Z",
            "updated_at": "2018-02-10T10:40:52.425Z",
            "bg_color": "#fae1ca"
        },
        {
            "id": 14,
            "name": "Johnathon",
            "category": "sub-zero",
            "price": 55740,
            "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1000.svg",
            "available": true,
            "created_at": "2018-02-10T10:40:52.437Z",
            "updated_at": "2018-02-10T10:40:52.437Z",
            "bg_color": "#ffe0e5"
        }
    ];

    function contentRender(cats) {
        let kittiArr = cats.map(function (cat) {
            return createKitti(cat);
        });

        let pageContent = ``;
        kittiArr.forEach(function (catCode) {
            pageContent += catCode;
        });

        return pageContent;
    }

    function createKitti(kitti) {
        let kittiPprice = kitti.price;
        let imageAdress = kitti.img_url;
        let kittiName = kitti.name;
        let kittiId = kitti.id;
        let kittiCategory = kitti.category;
        let kittiBackground = kitti.bg_color;

        let kittiCode = `
                <div class="kitti">
                    <div class="kitti-card" style="background-color: ${kittiBackground}">
                        <div class="kitti-card__price">
                            <span>For sale = ${kittiPprice}$</span>
                        </div>
                        <div class="kitti-card__image">
                            <img src=${imageAdress}>
                        </div>
                        <div class="kitti-card__name">${kittiName}</div>
                    </div>
                    <div class="kitti-info">
                        <div class="kitti-info__id">#${kittiId}</div>
                        <div class="kitti-info__category">${kittiCategory}</div>
                    </div>
                </div>`;

        return kittiCode;
    }

    document.querySelector(".kitties-wrapper").innerHTML = contentRender(kittiesBase);
});