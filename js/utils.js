function getFormattedDate(date) {
  const originDate = new Date(date);
  const year = originDate.getFullYear();
  const month = originDate.getMonth() + 1;
  const day = originDate.getDate();
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDay = day < 10 ? "0" + day : day;
  return `${year}/${formattedMonth}/${formattedDay}`;
}

function getQueryString() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const queryObj = {};
  urlParams.forEach((value, key) => {
    queryObj[key] = value;
  });
  return queryObj;
}

function getImageFileName(data) {
  const { BT_Name, IM_FILE, CoverFileName } = data;
  switch (BT_Name) {
    case "圖書":
      return CoverFileName;
    case "教案":
    case "教材":
    case "影片":
      return IM_FILE;
    default:
      return "";
  }
}

function toResource(data) {
  if (!data) return;
  const {
    Title,
    ShortDescrip,
    BC_Name,
    TC_Name,
    FC_Name,
    OB_Name,
    RS_Name,
    TP_Name,
  } = data;
  const type = BC_Name ?? TC_Name ?? FC_Name;

  return {
    title: Title,
    description: ShortDescrip,
    imageFileName: getImageFileName(data),
    type,
    target: OB_Name,
    tags: [...toTags(RS_Name), ...toTags(TP_Name)],
    ...data,
  };
}

function toTags(tags) {
  if (tags === null) return [];
  return tags.split(",");
}

function getImagePath(fileName, type) {
  switch (type) {
    case "圖書":
      //Files/cover/R_210_${fileName}
      return `/Files/cover/${fileName}`;
    case "教案":
    case "教材":
    case "影片":
      return `/Files/Gallery/${fileName}`;
    default:
      return "";
  }
}

function getDetailLink(result) {
  const { BT_Name, BookID, TC_Name } = result;
  let link = "/pages/";
  switch (BT_Name) {
    case "圖書":
      link = link + "Advanced_Filter_Books_Introduction.html";
      break;
    case "教案":
      link = link + "Advanced_Screening_Teaching_Plan_Introduction.html";
      break;
    case "教材":
      if (
        TC_Name === "教學圖卡" ||
        TC_Name === "教具設計" ||
        TC_Name === "實體教具" ||
        TC_Name === "懶人包"
      ) {
        link = link + "Advanced_Filter_Books_Introduction.html";
      } else {
        link = link + "Advanced_Filter_Games.html";
      }
      break;
    case "影片":
      link = link + "Advanced_Filter_Video.html";
      break;
    default:
      break;
  }
  return link + `?bookId=${BookID}`;
}

function getUniqueArray(array) {
  return Array.from(new Set(array));
}

async function getResourceDetail(id) {
  var apiUrl = "/server/resourceDetail.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return toResource(data[0]);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getGalleryDetail(id) {
  var apiUrl = "/server/galleryDetail.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data[0];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getLinks(id) {
  var apiUrl = "/server/links.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getSameResource(type, bookId) {
  let apiUrl = "/server/sameResource.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        typeName: type,
        bookId,
      }),
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getFiles(id) {
  var apiUrl = "/server/files.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getImages(id) {
  var apiUrl = "/server/image.php";
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showTOCNotGetText() {
  const toc = document.getElementById("xmlList");
  toc.style.display = "none";
  const tocText = document.getElementById("books-introduction__toc-text");
  tocText.innerHTML = `
    <h5>此資源無目錄。</h5>
  `;
}

async function fetchTOCConvertToList(id) {
  const response = await fetch(
    `${window.location.origin}/Files/Books/${id}/web/html5/tablet/${id}_toc_.xml`
  );
  if (response.status === 404) {
    showTOCNotGetText();
    return;
  }
  const text = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text, "text/xml");
  if (xmlDoc.querySelectorAll("pagedescription").length === 0) {
    showTOCNotGetText();
    return;
  }
  const xmlList = document.getElementById("xmlList");

  xmlDoc.querySelectorAll("pagedescription").forEach((element) => {
    const li = document.createElement("li");
    const page = element.getAttribute("page");
    const content = element.getAttribute("content");

    const aTag = document.createElement("a");
    aTag.href = `${window.location.origin}/Files/Books/${id}/web/html5/index.html?&locale=ENG&pn=${page}`;
    aTag.textContent = `${content}`;
    li.appendChild(aTag);

    const subList = element.querySelectorAll("pagedescription");
    if (subList.length > 0) {
      const ul = document.createElement("ul");
      subList.forEach((subElement) => {
        const subLi = document.createElement("li");
        const subPage = subElement.getAttribute("page");
        const subContent = subElement.getAttribute("content");

        const subATag = document.createElement("a");
        subATag.href = `${window.location.origin}/Files/Books/${id}/web/html5/index.html?&locale=ENG&pn=${subPage}`;
        subATag.textContent = ` · ${subContent}`;
        subLi.appendChild(subATag);

        ul.appendChild(subLi);
      });
      li.appendChild(ul);
    }

    xmlList.appendChild(li);
  });
}

function setBookDirectory(bookId) {
  fetch(
    `${window.location.origin}/Files/Books/${bookId}/web/html5/tablet/${bookId}_toc_.xml`
  )
    .then((response) => response.text())
    .then((xmlData) => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlData, "text/xml");
      const pageDescriptions = xmlDoc.getElementsByTagName("pagedescription");
      let contents = [];

      for (let i = 0; i < pageDescriptions.length; i++) {
        const content = pageDescriptions[i].getAttribute("content");
        if (content) {
          contents.push(content);
        }
      }

      const result = contents.join(" ");
      saveToData(result, bookId);
    })
    .catch((error) => console.error("Error fetching XML:", error))
    .finally(() => {
      console.log("Done");
    });
}

function saveToData(BookDirectoryData, bookId) {
  fetch("/server/setBookDirectory.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: bookId,
      BookDirectoryData,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Data saved:", data))
    .catch((error) => console.error("Error saving data:", error));
}
