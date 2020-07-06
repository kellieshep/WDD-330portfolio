writeToLS();
let pod = [];
let podList = [];
function writeToLS(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));


}

function readFromLS(key) {
    console.log('readFromLS initialized');
    return JSON.parse(window.localStorage.getItem(key));
}
if (typeof (localStorage.podList) !== "undefined" && localStorage.podList != "") {
    podList = JSON.parse(localStorage.podList);
    let countStop = podList.length;
    for (let i = 0; i < countStop; i++) {
        let item = podList[i];
        pastPics(item.date, item.title, item.media_type, item.url, item.copyright, item.explanation);
        console.log(pod)
    }


    localStorage.podList = [];

}

const pod_url = 'https://api.nasa.gov/planetary/apod?api_key=ok2IRhg9AT416LyHuhfKyBbMl67iUr6geZp37adx';
export default class NasaPod {

    constructor(elementID) {
        console.log('your in');
        this.key = elementID;
        this.parentElement = document.getElementById(elementID);
        this.backButton = this.buildBackButton();

        this.url = `${pod_url}`;
    }


    init() {
        console.log(`initializing data`);
        fetch(`${pod_url}`)
            .then(response => response.json())
            .then(data => {
                if (data !== podList [podList.length]){
                    pod.push(data);
                    console.log(pod);
                    podList.push(newPicture(data));
                }

                writeToLS('podList', pod);

                console.log(data);



                console.log(podList);
                this.showOneItem(data, data.date);
            });
    }

    showFullList() {
        const data = readFromLS(this.key);
        console.log(`showFullList initialized`);
        const container = this.parentElement;
        //clear the parent element
        container.innerHTML = '';
        //fill with the new list

        podList.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = `${element.date} - ${element.title}`;

            container.appendChild(li);
        })
        this.backButton.classList.add('hide');
        this.addListeners();

    }

    addListeners() {
        // get all 'li' children of the 'ul' element and attach a listener to each
        const listArr = Array.from(this.parentElement.children);
        //const dataArr = Array
        console.log(listArr);

        listArr.forEach(item => {
            item.addEventListener('click', event => {
                this.showPastItem(event.currentTarget.innerText);
            })
        })
    }

    getItemByDate(data, date) {

        return podList.find(item => item.date === data.date);
    }

    showOneItem(data, date) {

        const item = this.getItemByDate(data, date);
        const picturediv = document.createElement('div');
        picturediv.classList.add('full-detail');
        if (item.media_type === "image") {

            picturediv.innerHTML = `<h4>${item.date}</h4>
                         <h3>${item.title}</h3>
                         <img src=${item.url}>
                         <h5>Source: ${item.copyright}</h5>
                         <p>${item.explanation}</p>`

        }

        if (item.media_type === "video") {

                picturediv.innerHTML = `<h4>${item.date}</h4>
                             <h3>${item.title}</h3>
                             <video src=${item.url}>
                             <h5>Source: ${item.copyright}</h5>
                             <p>${item.explanation}</p>`

        }

            this.backButton.classList.remove('hide')
            document.getElementById('pod').appendChild(picturediv);

    }

    getPastItemByDate(pod, date) {

        return pod.find(item => item.date === pod.date);
        console.log('getpastitem', pod);
    }
    showPastItem(pod, date) {

        const item = this.getPastItemByDate(pod, date);
        const picturediv = document.createElement('div');
        picturediv.classList.add('full-detail');
        if (item.media_type === "image") {

            picturediv.innerHTML = `<h4>${item.date}</h4>
                         <h3>${item.title}</h3>
                         <img src=${item.url}>
                         <h5>Source: ${item.copyright}</h5>
                         <p>${item.explanation}</p>`

        }

        if (item.media_type === "video") {

            picturediv.innerHTML = `<h4>${item.date}</h4>
                             <h3>${item.title}</h3>
                             <video src=${item.url}>
                             <h5>Source: ${item.copyright}</h5>
                             <p>${item.explanation}</p>`

        }

        this.backButton.classList.remove('hide')
        document.getElementById('pod').appendChild(picturediv);

    }
    buildBackButton() {
        const backButton = document.createElement("button");
        backButton.textContent = "Past Images";
        backButton.onclick = () => {
            this.showFullList();
        };
        backButton.classList.add('back-button');
        this.parentElement.after(backButton);
        return backButton;
    }
}

function newPicture(picture) {
    const newPicture = {
        date: picture.date,
        title: picture.title,
        media_type: picture.media_type,
        url: picture.url,
        copyright: picture.copyright,
        explanation: picture.explanation
    };
    return newPicture;
}

function pastPics(picture) {
    const pastPics = {
        date: picture.date,
        title: picture.title,
        media_type: picture.media_type,
        url: picture.url,
        copyright: picture.copyright,
        explanation: picture.explanation
    };
    return pastPics;
}
