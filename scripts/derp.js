setTimeout(loadContent, 2000)

function createLead({ firstName, lastName, company }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, company }),
  }
  return fetch("http://localhost:5000/lead", requestOptions)
}

function updateButton(type) {
  const button = document.querySelector("#addlead")
  if (type === "success") {
    button.style.backgroundColor = "#0a0"
    button.innerText = "Added!"
  }
  if (type === "fail") {
    button.style.backgroundColor = "#a00"
    button.innerText = "Failed!"
  }
}

function loadContent() {
  const anchors = Array.from(document.querySelectorAll("a"))
  const email = anchors.find((anchor) => anchor.href.includes("mailto:"))?.href
  const emailAddy = email?.substring(7)

  const h1s = Array.from(document.querySelectorAll("h1"))

  const name = h1s[2].innerText
  const [_, firstName, lastName] = /(.+)\s(.+)/.exec(name)

  const ps = Array.from(document.querySelectorAll("p"))

  const currentCompany = ps.find(
    (p) => p.dataset.anonymize === "company-name"
  ).innerText

  const sections = Array.from(document.querySelectorAll("section"))

  const profileActions = sections.find((section) =>
    section.className.includes("actions-bar")
  )

  profileActions.innerHTML +=
    "<button id='addlead' style='background:#80a;color:#fff;border: none; padding: 7px 0px; border-radius: 18px; font-weight:700; width: 120px;'>Add Lead</button>"

  document.querySelector("#addlead").addEventListener("click", () => {
    createLead({ firstName, lastName, company: currentCompany })
      .then((_) => {
        updateButton("success")
      })
      .catch((_) => {
        updateButton("fail")
      })
  })
}
