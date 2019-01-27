document.addEventListener("DOMContentLoaded", function () {
    let anim_delay;
    let pageOffset = 0;
    let pageLimit = 12;
    let pageInclude = "sale";
    let pageOrderBy = "current_price";
    let pageOrderDirection = "asc";
    let pageSearch = "";
    let cattributesArr;
    let cattributesSearch = "";
    let searchFilter = "";
    let inputDefaultValue = "";

    function getCats(url) {
        fetch(url)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.error('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function(data) {
                        console.log(data);
                        document.querySelector(".kitties-wrapper").innerHTML = contentRender(data.kitties);
                        document.querySelector(".loader").classList.toggle("hidden");
                    });
                }
            )
            .catch(function(err) {
                console.error('Fetch Error :-S', err);
            });
    }

    //https://api.cryptokitties.co/cattributes?total=true
    function getCattributes(url) {
        fetch(url)
            .then(
                function(response) {
                    if (response.status !== 200) {
                        console.error('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function(data) {
                        cattributesArr = getCattributesArr(data);
                    });
                }
            )
            .catch(function(err) {
                console.error('Fetch Error :-S', err);
            });
    }

    function getCattributesArr(arr) {
        return arr.map(function (cattribute) {
            return cattribute.description;
        })
    }

    // function loader() {
    //     document.querySelector(".loader").classList.toggle("hidden");
    // }
    //
    // async function showCats(url) {
    //     const cats = await getCats(url);
    //     const awaitLoader = await loader();
    // }
    getCattributes("https://api.cryptokitties.co/cattributes?total=true");
    getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}${pageSearch}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);


    document.querySelector(".kitties-options__search input").addEventListener("focus", function () {
        document.querySelector(".kitties-options__search-area").classList.remove("hidden");
        document.querySelector(".kitties-options__search-options").classList.remove("hidden");
    });
    let inputString = "";
    document.querySelector(".kitties-options__search input").addEventListener("input", function () {
        document.querySelector(".kitties-options__search-serverElements").innerHTML = "";
        let inputValue = document.querySelector(".kitties-options__search input").value;
        if (!inputValue) return;
        let reg = new RegExp('\^' + inputValue + '\\w+', `i`);
        cattributesArr.forEach(function (cattribute) {
            if(reg.test(cattribute) || inputValue === cattribute){
                inputString += `<div class="search-server-value">${cattribute}</div>`
            }
        });
        document.querySelector(".kitties-options__search-serverElements").innerHTML = inputString;
        inputString = "";
    });

    document.querySelector(".kitties-options__search-serverElements").addEventListener("click", function (e) {
        let target = e.target;
        if(!target.closest(".search-server-value"))return;
        let cattributeValue = target.innerText;
        cattributesSearch = cattributeValue.toLowerCase();
        document.querySelector(".kitties-options__search-area").classList.add("hidden");
        document.querySelector(".kitties-options__search-options").classList.add("hidden");
        if (searchFilter){
            inputDefaultValue = `${cattributesSearch} cooldown:${searchFilter}`;
            pageSearch = `&search=${cattributesSearch}+cooldown:${searchFilter}`;

        }else {
            inputDefaultValue = `${cattributesSearch}`;
            pageSearch = `&search=${cattributesSearch}`;
        }

        document.querySelector(".kitties-options__search input").value = inputDefaultValue;
        document.querySelector(".loader").classList.toggle("hidden");
        getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}${pageSearch}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);
    });



    document.addEventListener("click", function (e) {
        if(e.target.closest(".kitties-options")) return;
        document.querySelector(".kitties-options__search-area").classList.add("hidden");
        document.querySelector(".kitties-options__search-options").classList.add("hidden");
    });

    document.querySelector(".kitties-options__filters-link").addEventListener("click", function () {
        document.querySelector(".kitties-options__filter-option").classList.toggle("hidden");
        document.querySelector(".kitties-options__filters-link .material-icons").classList.toggle("active-color");
    });

    document.querySelector(".kitties-options__filter-option").addEventListener("click", function (e) {
        const target = e.target;
        if (!target.closest("span"))return;
        let getFilterOptions = document.querySelectorAll(".kitties-options__filter-option span");

        if (!target.closest(".selectedFilter")){
            [...getFilterOptions].forEach(function (option) {
                option.classList.remove("selectedFilter");
                target.classList.add("selectedFilter");
            });
            searchFilter = target.innerText.toLowerCase();
            if (cattributesSearch){
                inputDefaultValue = `${cattributesSearch} cooldown:${searchFilter}`;
                pageSearch = `&search=${cattributesSearch}+cooldown:${searchFilter}`;
            }else {
                inputDefaultValue = `cooldown:${searchFilter}`;
                pageSearch = `&search=cooldown:${searchFilter}`;
            }
        } else {
            target.classList.remove("selectedFilter");
            if (cattributesSearch){
                inputDefaultValue = `${cattributesSearch}`;
                pageSearch = `&search=${cattributesSearch}`;
            }else {
                inputDefaultValue = ``;
                pageSearch = ``;
            }
        }

        document.querySelector(".kitties-options__search input").value = inputDefaultValue;
        document.querySelector(".loader").classList.toggle("hidden");
        getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}${pageSearch}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);
    });

    function nextPage() {
        document.querySelector(".page-navigation__prev").classList.remove("disabled");
        pageOffset += 12;
        document.querySelector(".loader").classList.toggle("hidden");
        getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}${pageSearch}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);
    }

    function prevPage() {
        if (pageOffset === 0) return;
        pageOffset -= 12;
        if (pageOffset === 0){
            document.querySelector(".page-navigation__prev").classList.add("disabled");
        }
        document.querySelector(".loader").classList.toggle("hidden");
        getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}${pageSearch}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);
    }

    document.querySelector("#kitties-options__sort-select").addEventListener("change", function () {
        let getOptionsList = document.querySelector("#kitties-options__sort-select").options;
        let getSelectedOption = document.querySelector("#kitties-options__sort-select").selectedIndex;
        pageOrderBy = getOptionsList[getSelectedOption].value;
        console.log(pageOrderBy);
        document.querySelector(".loader").classList.toggle("hidden");
        getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}${pageSearch}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);
    });

    document.querySelector(".kitties-options__check").addEventListener("click", function (e) {
        let target = e.target;
        if(this === target) return;
        pageInclude = 0;
        let checkCounter = 0;
        if (target.matches("input")) {
            let getAllInputs = document.querySelectorAll(".kitties-options__check input");
            [...getAllInputs].forEach(function (check) {
                if (check.checked && !pageInclude){
                    pageInclude = check.value;
                    checkCounter++;
                } else if (check.checked && pageInclude){
                    pageInclude += `,${check.value}`;
                    checkCounter++;
                }

                if (check.checked && target.value === "other"){
                    document.querySelector("#kitties-options__sort-select").options[0].classList.toggle("hidden");
                    document.querySelector("#kitties-options__sort-select").options.selectedIndex = 1;
                    pageOrderBy = "age";
                } else if (check.checked === false && target.value === "other"){
                    document.querySelector("#kitties-options__sort-select").options[0].classList.toggle("hidden");
                    document.querySelector("#kitties-options__sort-select").options.selectedIndex = 0;
                    pageOrderBy = "current_price";
                }
            });
            if (!checkCounter){
                e.preventDefault();
                return;
            }
            // console.log(pageInclude);
            // if (pageInclude === 0){
            //     document.querySelector(".kitties-options__check input").checked = true;
            //     pageInclude = "sale";
            // }
            document.querySelector(".loader").classList.toggle("hidden");
            getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}${pageSearch}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);
        }
        // if (target.matches("input")){
        //     pageInclude = target.value;
        //     // document.querySelector(".loader").classList.toggle("hidden");
        //     // getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);
        // }
    });

    document.querySelector(".kitties-options__search-options").addEventListener("click", function () {
        if (!pageSearch) return;
        document.querySelector(".kitties-options__search input").value = "";
        pageSearch = ``;
        cattributesSearch = "";
        searchFilter = "";

        document.querySelector(".kitties-options__search-area").classList.add("hidden");
        document.querySelector(".kitties-options__search-options").classList.add("hidden");
        document.querySelector(".kitties-options__search-serverElements").innerHTML = "";
        [...document.querySelectorAll(".kitties-options__filter-option span")].forEach(function (filter_element) {
            filter_element.classList.remove("selectedFilter");
        });

        document.querySelector(".loader").classList.toggle("hidden");
        getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}${pageSearch}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);
    });

    document.querySelector(".page-navigation__next").addEventListener("click", nextPage);
    document.querySelector(".page-navigation__prev").addEventListener("click", prevPage);


    const sortStatus = ["low to high", "high to low"];
    const sortValues = ["asc", "desc"];
    let sortCounter = 1;
    document.querySelector(".kitties-options__sort-button").addEventListener("click", function () {
        document.querySelector(".kitties-options__sort-button button").innerHTML = sortStatus[sortCounter % 2];
        pageOrderDirection = sortValues[sortCounter % 2];
        sortCounter++;
        document.querySelector(".loader").classList.toggle("hidden");
        getCats(`https://api.cryptokitties.co/v2/kitties?offset=${pageOffset}&limit=${pageLimit}${pageSearch}&parents=false&authenticated=false&include=${pageInclude}&orderBy=${pageOrderBy}&orderDirection=${pageOrderDirection}&total=true`);
    });

    let bg_color = [
        "#D3E8FF", "#FDE9E4", "#CDF5D4", "#EFE1DA", "#ECF4E0", "#FAEEFA", "#EEE9E8", "#D9F5CB", "#DFDFFA", "#FAF4CF"
    ];

    function contentRender(cats) {
        anim_delay = 0;
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
    
    function createKitti(kitti) {
        let kittiPprice;
        let aroundKittiPrice = (kitti.auction.current_price / 1000000000000000000).toFixed(4);
        if (kitti.auction.current_price){
            if (aroundKittiPrice < 0.0001){
                kittiPprice = `<img src="https://www.cryptokitties.co/icons/eggplant.svg" alt="" width="18px" height="18px">
                    <span>Wants to sire</span>`;
            }else if (aroundKittiPrice > 99999){
                kittiPprice = `<img src="https://www.cryptokitties.co/icons/tag.svg" alt="" width="18px" height="18px">
                    <span>For sale = 99999+</span>`;
            }else {kittiPprice = `<img src="https://www.cryptokitties.co/icons/tag.svg" alt="" width="18px" height="18px">
                <span>For sale = ${aroundKittiPrice}</span>`;
            }
        } else {kittiPprice = `<img src="https://www.cryptokitties.co/icons/tag.svg" alt="" width="18px" height="18px">
                <span>- - - - -</span>`;
        }
        let imageAdress = kitti.image_url;
        let kittiName;
        if (kitti.name){
            kittiName = kitti.name;
        } else {kittiName = "- - - - -"}
        let kittiId = kitti.id;
        let kittiCategory = function () {
            let status = kitti.status.cooldown_index;
            if(status < 2){return "Fast"}
            else if (status < 3){return "Swift"}
            else  if (status < 5){return "Snappy"}
            else  if (status < 7){return "Brisk"}
            else  if (status < 10){return "Plodding"}
            else  if (status < 11){return "Slow"}
            else  if (status < 13){return "Sluggish"}
            else  if (status >= 13){return "Catatonic"}
        };
        anim_delay += 0.1;

        return `
                <div class="kitti" style="animation-delay: ${anim_delay}s">
                    <div class="kitti-card" style="background-color: ${bg_color[getRandomInt(0, bg_color.length - 1)]}">
                        <div class="kitti-card__price">${kittiPprice}</div>
                        <div class="kitti-card__image">
                            <img src=${imageAdress} width="250px">
                        </div>
                        <div class="kitti-card__name">${kittiName}</div>
                    </div>
                    <div class="kitti__info">
                        <div class="kitti-info__id">#${kittiId}</div>
                        <div class="kitti-info__category">${kittiCategory()}</div>
                    </div>
                </div>`;
    }
});