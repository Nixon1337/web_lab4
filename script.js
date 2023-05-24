document.getElementById("search-button").addEventListener("click", () => {
  const term = document.getElementById("term-input").value;
  if (term) {
    search(term);
  }
});

document.getElementById("get").addEventListener("click", () => {
  fetch(window.location.href)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.text();
    })
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerText = data;
    })
    .catch((error) => {
      console.error("Error:", error.message);
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerText = "An error occurred";
    });
});

document.getElementById("get-file-button").addEventListener("click", () => {
  const file = document.getElementById("file").value;

  fetch(`${window.location.href}${file}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.text();
    })
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerText = data;
    })
    .catch((error) => {
      console.error("Error:", error.message);
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerText = "An error occurred";
    });
});

function search(term, retries = 3) {
  const url = `/api?term=${term}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then((data) => {
      const resultsDiv = document.getElementById("results");
      resultsDiv.innerText = "";

      data.forEach((result) => {
        const albumInfo = document.createElement("p");
        albumInfo.innerHTML = `Album: ${result.album}, Artist: ${result.artist}, Price: ${result.price}`;
        resultsDiv.appendChild(albumInfo);
      });
    })
    .catch((error) => {
      console.error("Error:", error.message);
      if (retries > 0) {
        // Повторення запиту через 1 секунду
        setTimeout(() => {
          search(expression, retries - 1);
        }, 1000);
      } else {
        const result = document.getElementById("results");
        result.innerText = "An error occurred";
      }
    });
}
