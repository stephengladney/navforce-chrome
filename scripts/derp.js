setTimeout(loadContent, 2000)

async function createLead({ firstName, lastName, company, email }) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, company, email }),
  }
  const response = await fetch("http://localhost:5000/lead", requestOptions)
  if (!response.ok) throw "Error"
  else return response
}

function updateButton(type) {
  const button = document.querySelector("#addlead")
  if (type === "pending") {
    button.style.backgroundColor = "#888"
    button.innerText = "Adding..."
  }
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

  const currentCompany =
    ps.find((p) => p.dataset.anonymize === "company-name")?.innerText ??
    "Unknown"

  const sections = Array.from(document.querySelectorAll("section"))

  const profileActions = sections.find((section) =>
    section.className.includes("actions-bar")
  )

  const isReactDev = document.body.innerText.includes("React")

  if (isReactDev) {
    const newButton = profileActions.appendChild(
      document.createElement("button")
    )
    newButton.id = "addlead"
    newButton.style =
      "background:#80a;color:#fff;border: none; padding: 7px 0px; border-radius: 18px; font-weight:700; width: 120px; margin-right: 10px;"
    newButton.innerText = "Add Lead"

    const reactFound = profileActions.appendChild(
      document.createElement("span")
    )

    reactFound.style =
      "background: #0bd; color: #fff; padding: 5px 10px; border-radius: 18px; font-weight: 700; margin-right: 10px;"
    reactFound.innerText = "React"

    newButton.addEventListener("click", () => {
      updateButton("pending")
      createLead({
        firstName,
        lastName,
        company: currentCompany,
        email: emailAddy,
      })
        .then((_) => {
          updateButton("success")
        })
        .catch((_) => {
          updateButton("fail")
        })
    })
  } else {
    const reactFound = profileActions.appendChild(
      document.createElement("span")
    )
    reactFound.style =
      "background: #c00; color: #fff; padding: 5px 10px; border-radius: 18px; font-weight: 700"
    reactFound.innerText = "No React"
  }
}
