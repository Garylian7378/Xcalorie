function analyzeFood() {
  const fileInput = document.getElementById("foodUpload");
  const result = document.getElementById("result");

  if (fileInput.files.length === 0) {
    result.innerText = "Please upload a food photo!";
    return;
  }

  // 🔮 Later: send to AI API
  result.innerText = "Analyzing food photo... (AI model goes here)";
}
