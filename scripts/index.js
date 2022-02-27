// No need for this as `id` attribute already defines the element in the js env
// Backwards compability lmfao
// const fileInput = document.getElementById("fileInput")

// But sadly, IDE won't just recognize its type. So let's define it with JSDOC comments

if (new URLSearchParams(window.location.search).get("type") == "profile") {
     import("scripts/profile_ratios.js")
} else {
     import("scripts/popup_ratios.js")
}

/**
 * @type {HTMLInputElement}
 */
const fileInput = document.getElementById("fileInput") // I feel kinda sad :/

fileInput.addEventListener("change", () => {
     revealBannerEditor(fileInput.files[0])
     document.getElementById("initial-screen").remove()
})

/**
 * 
 * @param {File} file 
 */
function revealBannerEditor(file) {
     const bannerEditor = document.getElementById("banner-editor")
     const editorContainer = document.getElementsByClassName("editor-container")[0] // too lazy to give an id tbh

     bannerEditor.removeAttribute("style") // why set the default value in js when you can just remove the attrbiute

     const fileReader = new FileReader()

     fileReader.onload = () => {
          const fileURI = fileReader.result
          const img = document.getElementById("editor-image")
          img.addEventListener("load", () => {
               if ((img.clientWidth / img.clientHeight) >= 2.5) {
                    bannerEditor.style.display = "none"
                    alert("Please enter an image whose aspect ratio is smaller than 2.5")
                    window.location = window.location
                    return
               }
               editorContainer.style.width = img.clientWidth + "px"
               editorContainer.style.height = img.clientHeight + "px"
          })

          img.src = fileURI

          const slider = document.getElementById("topHeight")

          slider.addEventListener("input", () => {
               editorContainer.children[1].style.transform = `translateY(${getTopOffset(img, slider.value / 100)}px)`
          })
     }

     fileReader.readAsDataURL(file)
}

/**
 * 
 * @param {*} value 
 */
function getTopOffset(img, value) {
     return (img.clientHeight - img.clientWidth * 0.55) * value
}

function saveBanner() {
     const fileReader = new FileReader()
     fileReader.onload = async () => {
          const image = await IJS.Image.load(fileReader.result)

          const w = image.width
          const h = image.height
          const nh = w / 2.5
          const value = document.getElementById("topHeight").value / 100

          const topOffset = (h - w * 0.55) * value

          const banner = image.crop({
               x: 0,
               y: topOffset,
               width: w,
               height: nh
          })

          downloadBlob(await banner.toBlob("image/png"), "banner.png")

          const picSize = w * ratio.picSize
          console.log(topOffset, nh, ratio.picSize / 2)
          const photo = image.crop({
               x: w * ratio.picOffset,
               y: topOffset + nh - (w * ratio.picSize / 2),
               width: picSize,
               height: picSize
          })

          downloadBlob(await photo.toBlob("image/png"), "photo.png")
     }

     fileReader.readAsArrayBuffer(fileInput.files[0])
}

function downloadBlob(blob, name) {
     const url = window.URL.createObjectURL(blob)
     const a = document.createElement('a')
     a.style.display = 'none'
     a.href = url
     a.download = name
     document.body.appendChild(a)
     a.click()
     window.URL.revokeObjectURL(url)
}