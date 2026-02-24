function roastIdea() {
  const idea = document.getElementById("ideaInput").value;
  const responseBox = document.getElementById("response");

  if (!idea.trim()) {
    responseBox.style.display = "block";
    responseBox.innerText = "Say something first. Empty ideas go nowhere.";
    return;
  }

  responseBox.style.display = "block";
  responseBox.innerText =
    "This sounds like a starting thought, not a business. " +
    "Who is paying you, why now, and why you? " +
    "If you can’t answer that clearly, don’t expect the market to care.";
}
