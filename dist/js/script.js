document.addEventListener("DOMContentLoaded", function () {

    fetch('https://ma-cats-api.herokuapp.com/api/cats?per_page=12')
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then(function(data) {
                    document.querySelector(".kitties-wrapper").innerHTML = contentRender(data.cats);
                    document.querySelector(".loader").classList.toggle("hidden");
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });

    // const kittiesBase = [
    //     {
    //         "id": 1,
    //         "name": "simon",
    //         "category": "fast",
    //         "price": 100,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495636.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.179Z",
    //         "updated_at": "2018-02-06T23:08:49.179Z"
    //     },
    //     {
    //         "id": 2,
    //         "name": "felix",
    //         "category": "fast",
    //         "price": 10000,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495625.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.186Z",
    //         "updated_at": "2018-02-06T23:08:49.186Z"
    //     },
    //     {
    //         "id": 3,
    //         "name": "luna",
    //         "category": "slow",
    //         "price": 2000,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495622.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.190Z",
    //         "updated_at": "2018-02-06T23:08:49.190Z"
    //     },
    //     {
    //         "id": 4,
    //         "name": "oliver",
    //         "category": "fast",
    //         "price": 9000,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495619.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.193Z",
    //         "updated_at": "2018-02-06T23:08:49.193Z"
    //     },
    //     {
    //         "id": 5,
    //         "name": "oreo",
    //         "category": "middle",
    //         "price": 100,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495616.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.197Z",
    //         "updated_at": "2018-02-06T23:08:49.197Z"
    //     },
    //     {
    //         "id": 6,
    //         "name": "molly",
    //         "category": "slow",
    //         "price": 3000,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495613.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.201Z",
    //         "updated_at": "2018-02-06T23:08:49.201Z"
    //     },
    //     {
    //         "id": 7,
    //         "name": "simba",
    //         "category": "fast",
    //         "price": 11000,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495592.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.205Z",
    //         "updated_at": "2018-02-06T23:08:49.205Z"
    //     },
    //     {
    //         "id": 8,
    //         "name": "jack",
    //         "category": "middle",
    //         "price": 5000,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/495579.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.209Z",
    //         "updated_at": "2018-02-06T23:08:49.209Z"
    //     },
    //     {
    //         "id": 10,
    //         "name": "loki",
    //         "category": "fast",
    //         "price": 20000,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/336916.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.216Z",
    //         "updated_at": "2018-02-06T23:08:49.216Z"
    //     },
    //     {
    //         "id": 11,
    //         "name": "milo",
    //         "category": "slow",
    //         "price": 3500,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/336916.svg",
    //         "available": true,
    //         "created_at": "2018-02-06T23:08:49.220Z",
    //         "updated_at": "2018-02-06T23:08:49.220Z"
    //     },
    //     {
    //         "id": 13,
    //         "name": "Homer",
    //         "category": "sub-zero",
    //         "price": 91233,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/117910.svg",
    //         "available": true,
    //         "created_at": "2018-02-10T10:40:52.425Z",
    //         "updated_at": "2018-02-10T10:40:52.425Z"
    //     },
    //     {
    //         "id": 14,
    //         "name": "Johnathon",
    //         "category": "sub-zero",
    //         "price": 55740,
    //         "img_url": "https://storage.googleapis.com/ck-kitty-image/0x06012c8cf97bead5deae237070f9587f8e7a266d/1000.svg",
    //         "available": true,
    //         "created_at": "2018-02-10T10:40:52.437Z",
    //         "updated_at": "2018-02-10T10:40:52.437Z"
    //     }
    // ];

    let bg_color = ["#d3e8ff", "#fae1ca", "#dbf0d0", "#dfdffa", "#ffe0e5", "#ede2f5", "#d1eeeb", "#eee9e8"];

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

    function getRandomInt(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let anim_delay = 0;
    function createKitti(kitti) {
        let kittiPprice = kitti.price;
        let imageAdress = kitti.img_url;
        let kittiName = kitti.name;
        let kittiId = kitti.id;
        let kittiCategory = kitti.category;
        anim_delay += 0.1;

        return `
                <div class="kitti" style="animation-delay: ${anim_delay}s">
                    <div class="kitti-card" style="background-color: ${bg_color[getRandomInt(0, bg_color.length-1)]}">
                        <div class="kitti-card__price">
                            <span>For sale = ${kittiPprice}$</span>
                        </div>
                        <div class="kitti-card__image">
                            <img src=${imageAdress}>
                        </div>
                        <div class="kitti-card__name">${kittiName}</div>
                    </div>
                    <div class="kitti__info">
                        <div class="kitti-info__id">#${kittiId}</div>
                        <div class="kitti-info__category">${kittiCategory}</div>
                    </div>
                </div>`;
    }
});