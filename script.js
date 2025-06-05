async function fetchData() {
    const result = await fetch("https://jsonplaceholder.typicode.com/todos");
    const json = await result.json();
    console.log(json);
}

function fetchDataV2() {
    fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((jsonUser) => {
            var ul = document.getElementById("ul");
            console.log(jsonUser);
            jsonUser.forEach((element) => {
                var li = document.createElement("div");
                li.classList.add("card");

                li.appendChild(
                    document.createTextNode(
                        `${element.title} - ${element.id} - ${element.completed} - ${element.userId}`
                    )
                );

                ul.appendChild(li);
            });
        });
}

fetchDataV2();
