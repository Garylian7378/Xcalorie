async function analyzeFood() {
  const fileInput = document.getElementById("foodUpload");
  const result = document.getElementById("result");

  if (fileInput.files.length === 0) {
    result.innerText = "Please upload a food photo!";
    return;
  }

  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onloadend = async function () {
    const base64 = reader.result.split(",")[1];

    result.innerText = "Analyzing food photo...";

    try {
      const response = await fetch("https://api.clarifai.com/v2/models/food-item-recognition/outputs", {
        method: "POST",
        headers: {
          "Authorization": "3ebfc32885d04842a6ed37ef293db190",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: [
            {
              data: {
                image: { base64: base64 }
              }
            }
          ]
        })
      });

      const data = await response.json();
      console.log(data);

      if (data.outputs && data.outputs[0].data.concepts.length > 0) {
        const food = data.outputs[0].data.concepts[0];
        result.innerText = `Detected: ${food.name} (confidence: ${(food.value * 100).toFixed(2)}%)`;
      } else {
        result.innerText = "No food detected 😢";
      }
    } catch (err) {
      console.error(err);
      result.innerText = "Error analyzing image.";
    }
  };
  reader.readAsDataURL(file);
}
