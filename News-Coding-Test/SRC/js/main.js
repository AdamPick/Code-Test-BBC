var articleUrls = [
    "https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-1.json",
    "https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-2.json",
    "https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-3.json",
    "https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-4.json",
    "https://raw.githubusercontent.com/bbc/news-coding-test-dataset/master/data/article-5.json"
];
// Store XMLHttpRequest and the JSON file location in variables
var xhr = new XMLHttpRequest();
var currentUrl = "";
var random = [];
var removed = [];
var count = 0

while (removed.length!=5){
    var x = Math.floor((Math.random() * 5));
    if (!removed.includes(x)){
        random.push(articleUrls[x]);
        removed.push(x);
    }
}
currentUrl = random[count];
// Called whenever the readyState attribute changes 
xhr.onreadystatechange = function() {

  // Check if fetch request is done
  if (xhr.readyState == 4 && xhr.status == 200) { 
  
    // Parse the JSON string
    var jsonData = JSON.parse(xhr.responseText);
    
    // Call showData(), with the JSON string given from GitHub
    showData(jsonData);
  }
};

// Do the HTTP call using the url variable we specified above
xhr.open("GET", currentUrl, true);
xhr.send();

// Function that formats the string with HTML tags, then outputs the result
function showData(data) {
    //document.body.remove(img);
    var title = "<ul>"+(data.title)+"</ul>"; // Open list
    var heading = "";
    var output = "<ul>"; // Open list
    var i;
    var types = ["heading","paragraph","image","list"]
        // Loop through the body elements and the types from them, and add them as list items
    for (var i in data.body) {
        if (data.body[i].type == types[0])
            heading += data.body[i].model.text;
        else if (data.body[i].type == types[1]){
            output += data.body[i].model.text;//'&nbsp'.repeat(400);
        }
        else if (data.body[i].type == types[2]){
            displayImage(data.body[i].model.url,data.body[i].model.width,data.body[i].model.height,data.body[i].model.altText);
        }
        else if (data.body[i].type == types[3]){
            output += '&nbsp'.repeat(400);
            for (var j in data.body[i].model.items)
                output += "---"+data.body[i].model.items[j];
        }
    }
    output += "</ul>"; // Close list

    // Output the data to the "title" element
    document.getElementById("title").innerHTML = title;
    document.getElementById("heading").innerHTML = heading;
    document.getElementById("articleText").innerHTML = output;
};
function displayImage(src, width, height, alt) {
        var img = document.createElement("img");
        img.src = src;
        img.width = width;
        img.height = height;
        img.alt = alt;
        document.body.appendChild(img);
    };

function nextArticle() {
    count+=1;
    currentUrl = random[count];
    xhr.open("GET", currentUrl, true);
    xhr.send();
}
//not finished
function removeImage(id) {
    var elementToBeRemoved = document.getElementById(id);
    elementToBeRemoved.body.removeChild(elementToBeRemoved);
}

