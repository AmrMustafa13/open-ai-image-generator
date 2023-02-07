const onSubmit = (e) => {
  e.preventDefault();

  document.querySelector(".msg").textContent = "";
  document.querySelector("#image").src = "";

  const prompt = document.querySelector("#prompt").value;
  const size = document.querySelector("#size").value;

  if (prompt.trim() === "") {
    alert("Please add some text");
    return;
  }
  generateImage(prompt, size);
};

const generateImage = async (prompt, size) => {
  try {
    showSpinner();
    const res = await fetch("/openai/generateimage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, size }),
    });

    if (!res.ok) {
      throw new Error("Image generation failed");
    }

    const data = await res.json();
    const image = document.querySelector("#image");
    image.src = data.data;
    hideSpinner();
  } catch (error) {
    document.querySelector(".msg").textContent = error;
  }
};

const showSpinner = () => {
  const spinner = document.querySelector(".spinner");
  spinner.classList.add("show");
};

const hideSpinner = () => {
  const spinner = document.querySelector(".spinner");
  spinner.classList.remove("show");
};

document.querySelector("#image-form").addEventListener("submit", onSubmit);
