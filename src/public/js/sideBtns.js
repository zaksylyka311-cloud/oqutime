async function getCachedOrFetch(url, storageKey) {
  const cachedData = localStorage.getItem(storageKey);
  if (cachedData) {
    try {
      return JSON.parse(cachedData);
    } catch (e) {
      console.error("Error parsing JSON from localStorage", e);
    }
  }

  const response = await fetch(url);
  const data = await response.json();
  localStorage.setItem(storageKey, JSON.stringify(data));
  return data;
}

export let skinsObject = await getCachedOrFetch(
  `/js/json/skins/${lang}-skins.json`,
  `${lang}-skins`
);
export let defaultsObject = await getCachedOrFetch(
  `/js/json/defaults/${lang}-defaults.json`,
  `${lang}-defaults`
);
export let agentsObject = await getCachedOrFetch(
  `/js/json/skins/${lang}-agents.json`,
  `${lang}-agents`
);
export let musicObject = await getCachedOrFetch(
  `/js/json/skins/${lang}-music.json`,
  `${lang}-music`
);


const sideBtnHandler = (activeBtn) => {
  // remove active background
  let allBtns = [
    "sideBtnKnives",
    "sideBtnGloves",
    "sideBtnMusics",
    "sideBtnPistols",
    "sideBtnRifles",
    "sideBtnPPs",
    "sideBtnShotguns",
    "sideBtnUtility",
    "sideBtnCTAgents",
    "sideBtnTAgents",
  ];

  allBtns.forEach((element) => {
    let elms = document.querySelectorAll(`[id='${element}']`);

    for (var i = 0; i < elms.length; i++)
      elms[i].classList.remove("active-side");
  });
  document.getElementById("sideBtnKnives").classList.remove("active-side");
  document.getElementById("sideBtnGloves").classList.remove("active-side");
  document.getElementById("sideBtnMusics").classList.remove("active-side");
  document.getElementById("sideBtnPistols").classList.remove("active-side");
  document.getElementById("sideBtnRifles").classList.remove("active-side");
  document.getElementById("sideBtnPPs").classList.remove("active-side");
  document.getElementById("sideBtnShotguns").classList.remove("active-side");
  document.getElementById("sideBtnUtility").classList.remove("active-side");

  // add active background
  let elms = document.querySelectorAll(`[id='${activeBtn}']`);

  for (var i = 0; i < elms.length; i++) elms[i].classList.add("active-side");
};

const showDefaults = (type) => {
  // clear main container
  document.getElementById("skinsContainer").innerHTML = "";

  if (type == "sfui_invpanel_filter_melee") {
    defaultsObject.forEach((knife) => {
      if (knife.weapon_type == "sfui_invpanel_filter_melee") {
        const skinWeapon = selectedSkins.find((element) => {
          if (element.weapon_defindex == weaponIds[knife.weapon_name]) {
            return true;
          }
          return false;
        });

        if (typeof skinWeapon != "undefined") {
          changeKnifeSkinTemplate(knife, langObject, selectedKnife);
          changeSkinCard(knife, skinWeapon);
        } else {
          knivesTemplate(knife, langObject, selectedKnife);
        }
      }
    });
  } else if (type == "sfui_invpanel_filter_gloves") {
    defaultsObject.forEach((glove) => {
      if (glove.weapon_type == "sfui_invpanel_filter_gloves") {
        const skinWeapon = selectedSkins.find((element) => {
          if (element.weapon_defindex == weaponIds[glove.weapon_name]) {
            return true;
          }
          return false;
        });

        if (typeof skinWeapon != "undefined") {
          changeGlovesSkinTemplate(glove, langObject, selectedGloves);
          changeSkinCard(glove, skinWeapon);
        } else {
          glovesTemplate(glove, langObject, selectedGloves);
        }
      }
    });
  } else {
    defaultsObject.forEach((weapon) => {
      if (weapon.weapon_type == type) {
        const skinWeapon = selectedSkins.find((element) => {
          if (element.weapon_defindex == weaponIds[weapon.weapon_name]) {
            return true;
          }
          return false;
        });

        if (typeof skinWeapon != "undefined") {
          changeSkinTemplate(weapon, langObject, selectedKnife);
          changeSkinCard(weapon, skinWeapon);
        } else {
          defaultsTemplate(weapon, langObject, lang);
        }
      }
    });
  }
};

const showKnives = () => {
  sideBtnHandler("sideBtnKnives");
  showDefaults("sfui_invpanel_filter_melee");
};

const showGloves = () => {
  sideBtnHandler("sideBtnGloves");
  showDefaults("sfui_invpanel_filter_gloves");
};

const showMusics = () => {
  sideBtnHandler("sideBtnMusics");
  //showMusic();
};

const showPistols = () => {
  sideBtnHandler("sideBtnPistols");
  showDefaults("csgo_inventory_weapon_category_pistols");
};

const showRifles = () => {
  sideBtnHandler("sideBtnRifles");
  showDefaults("csgo_inventory_weapon_category_rifles");
};

const showSniperRifles = () => {
  sideBtnHandler("sideBtnSniperRifles");
  showDefaults("csgo_inventory_weapon_category_rifles");
};

const showPPs = () => {
  sideBtnHandler("sideBtnPPs");
  showDefaults("csgo_inventory_weapon_category_smgs");
};

const showShotguns = () => {
  sideBtnHandler("sideBtnShotguns");
  showDefaults("csgo_inventory_weapon_category_heavy");
};

const showP = () => {
  sideBtnHandler("sideBtnP");
  showDefaults("csgo_inventory_weapon_category_heavy");
};

const showUtility = () => {
  sideBtnHandler("sideBtnUtility");
  showDefaults("csgo_inventory_weapon_category_utility");
};

const showCTAgents = () => {
  sideBtnHandler("sideBtnCTAgents");
  showAgents("ct");
};

const showTAgents = () => {
  sideBtnHandler("sideBtnTAgents");
  showAgents("t");
};

const showWorkshop = () => {
  sideBtnHandler("sideBtnWorkshop");
  workShopTemplate();
  socket.emit("get-workshop", { i: workshopAmount, steamid: user.id });
  socket.emit("get-my-workshop", { steamid: user.id });
  workshopAmount += 10;
  found = true;
};

window.showKnives = showKnives;
window.showGloves = showGloves;
window.showMusics = showMusics;
window.showPistols = showPistols;
window.showRifles = showRifles;
window.showSniperRifles = showSniperRifles;
window.showPPs = showPPs;
window.showShotguns = showShotguns;
window.showP = showP;
window.showUtility = showUtility;
window.showCTAgents = showCTAgents;
window.showTAgents = showTAgents;
window.showWorkshop = showWorkshop;

const sideBtns = document.querySelectorAll('[data-type="sideBtn"]');
sideBtns.forEach((btn) => {
  let attribute = btn.getAttribute("data-btn-type");
  switch (attribute) {
    case "knives":
      btn.addEventListener("click", showKnives);
      break;
    case "gloves":
      btn.addEventListener("click", showGloves);
      break;
    case "musics":
      btn.addEventListener("click", showMusics);
      break;
    case "pistols":
      btn.addEventListener("click", showPistols);
      break;
    case "rifles":
      btn.addEventListener("click", showRifles);
      break;
    case "smgs":
      btn.addEventListener("click", showPPs);
      break;
    case "heavy":
      btn.addEventListener("click", showP);
      break;
    case "utlility":
      btn.addEventListener("click", showUtility);
      break;
    case "ctAgents":
      btn.addEventListener("click", showCTAgents);
      break;
    case "tAgents":
      btn.addEventListener("click", showTAgents);
      break;
    default:
      break;
  }
});

window.changeKnife = (weaponid) => {
  socket.emit("change-knife", { weaponid: weaponid, steamUserId: user.id });
  document.getElementById(`loading-${weaponid}`).style.visibility = "visible";
  document.getElementById(`loading-${weaponid}`).style.opacity = 1;
};

window.changeGlove = (weaponid) => {
  socket.emit("change-glove", {
    weaponid: weaponIds[weaponid],
    steamUserId: user.id,
  });
  document.getElementById(`loading-${weaponid}`).style.visibility = "visible";
  document.getElementById(`loading-${weaponid}`).style.opacity = 1;
};

window.changeSkin = (steamid, weaponid, paintid) => {
  socket.emit("change-skin", {
    steamid: steamid,
    weaponid: weaponid,
    paintid: paintid,
  });
  document.getElementById(`loading-${weaponid}-${paintid}`).style.visibility =
    "visible";
  document.getElementById(`loading-${weaponid}-${paintid}`).style.opacity = 1;
};

window.changeAgent = (steamid, model, team) => {
  console.log(steamid, model, team);
  socket.emit("change-agent", { steamid: steamid, model: model, team: team });
  document.getElementById(`loading-${model}`).style.visibility = "visible";
  document.getElementById(`loading-${model}`).style.opacity = 1;
};

window.changeMusic = (steamid, id) => {
  console.log(steamid, id);
  socket.emit("change-music", { steamid: steamid, id: id });
  document.getElementById(`loading-${id}`).style.visibility = "visible";
  document.getElementById(`loading-${id}`).style.opacity = 1;
};

window.resetSkin = (weaponid, steamid) => {
  console.log(steamid, weaponid);
  socket.emit("reset-skin", { steamid: user.id, weaponid: weaponid });
};

socket.on("skin-reset", (data) => {
  console.log(data);

  const weapon_name = getKeyByValue(weaponIds, data.weaponid);

  document.getElementById(`img-${weapon_name}`).src = document.getElementById(
    `img-${weapon_name}`
  ).alt;
  document.getElementById(`img-${weapon_name}`).style.filter = "";
  document.getElementById(`reset-${weapon_name}`).outerHTML = "";
  document.getElementById(
    `skinPaintName-${weapon_name}`
  ).innerHTML = `<small>${langObject.defaultSkin}</small>`;

  let tempSkins = [];

  selectedSkins.forEach((element) => {
    if (element.weapon_defindex != data.weaponid) {
      tempSkins.push(element);
    }
  });

  selectedSkins = tempSkins;
});

socket.on("knife-changed", (data) => {
  let elms = document.getElementsByClassName("weapon_knife");

  for (var i = 0; i < elms.length; i++) {
    elms[i].classList.remove("active-card");
    const button = elms[i].querySelectorAll("button");
    button[
      button.length - 1
    ].innerHTML = `<small>${langObject.setWeapon}</small>`;
    button[button.length - 1].onclick = function () {
      changeKnife(`${button[button.length - 1].getAttribute("data-knife")}`);
    };
  }

  selectedKnife.knife = data.knife;

  document.getElementById(data.knife).classList.add("active-card");
  const button = document.getElementById(data.knife).querySelectorAll("button");
  button[
    button.length - 1
  ].innerHTML = `<small>${langObject.changeSkin}</small>`;
  button[button.length - 1].onclick = function () {
    knifeSkins(`${data.knife}`);
  };
  document.getElementById(`loading-${data.knife}`).style.opacity = 0;
  document.getElementById(`loading-${data.knife}`).style.visibility = "hidden";
});

socket.on("glove-changed", (data) => {
  let elms = document.getElementsByClassName("weapon_knife");

  for (var i = 0; i < elms.length; i++) {
    elms[i].classList.remove("active-card");
    const button = elms[i].querySelectorAll("button");
    button[
      button.length - 1
    ].innerHTML = `<small>${langObject.setWeapon}</small>`;
    button[button.length - 1].onclick = function () {
      changeGlove(`${button[button.length - 1].getAttribute("data-knife")}`);
    };
  }

  const gloves = getKeyByValue(weaponIds, data.knife);

  selectedGloves.weapon_defindex = data.knife;

  document.getElementById(gloves).classList.add("active-card");
  const button = document.getElementById(gloves).querySelectorAll("button");
  button[
    button.length - 1
  ].innerHTML = `<small>${langObject.changeSkin}</small>`;
  button[button.length - 1].onclick = function () {
    knifeSkins(`${gloves}`);
  };
  document.getElementById(`loading-${gloves}`).style.opacity = 0;
  document.getElementById(`loading-${gloves}`).style.visibility = "hidden";
});

socket.on("skin-changed", (data) => {
  let elms = document.getElementsByClassName("weapon-card");

  for (var i = 0; i < elms.length; i++) {
    elms[i].classList.remove("active-card");
  }

  selectedSkins = data.newSkins;

  document
    .getElementById(`weapon-${data.weaponid}-${data.paintid}`)
    .classList.add("active-card");
  document.getElementById(
    `loading-${data.weaponid}-${data.paintid}`
  ).style.opacity = 0;
  document.getElementById(
    `loading-${data.weaponid}-${data.paintid}`
  ).style.visibility = "hidden";
});

socket.on("agent-changed", (data) => {
  let elms = document.getElementsByClassName("weapon-card");

  for (var i = 0; i < elms.length; i++) {
    elms[i].classList.remove("active-card");
  }

  selectedAgents = data.agents[0];

  document
    .getElementById(`agent-${data.currentAgent}`)
    .classList.add("active-card");
  document.getElementById(`loading-${data.currentAgent}`).style.opacity = 0;
  document.getElementById(`loading-${data.currentAgent}`).style.visibility =
    "hidden";
});

socket.on("music-changed", (data) => {
  let elms = document.getElementsByClassName("weapon-card");

  for (var i = 0; i < elms.length; i++) {
    elms[i].classList.remove("active-card");
  }

  selectedMusic.music_id = data.music;
  document
    .getElementById(`music-${data.music}`)
    .classList.add("active-card");
  document.getElementById(`loading-${data.music}`).style.opacity = 0;
  document.getElementById(`loading-${data.music}`).style.visibility =
    "hidden";
});

window.knifeSkins = (knifeType) => {
  // clear main container
  document.getElementById("skinsContainer").innerHTML = "";

  skinsObject.forEach((element) => {
    if (element.weapon.id == knifeType) {
      let rarities = {
        "#b0c3d9": "common",
        "#5e98d9": "uncommon",
        "#4b69ff": "rare",
        "#8847ff": "mythical",
        "#d32ce6": "legendary",
        "#eb4b4b": "ancient",
        "#e4ae39": "contraband",
      };

      let bgColor = "card-uncommon";
      let phase = "";
      let active = "";
      let steamid = user.id;
      let weaponid = weaponIds[element.weapon.id];
      let paintid = element.paint_index;
      let float = 0.000001;
      let pattern = 0;

      // Get color of item for card
      if (element.category.id == "sfui_invpanel_filter_melee") {
        // Gold if knife
        bgColor = "card-gold";
      } else {
        // Anything else
        bgColor = `card-${rarities[element.rarity.color]}`;
      }

      // Phase for Dopplers
      if (typeof element.phase != "undefined") {
        phase = `(${element.phase})`;
      }

      // Make outline if this skin is selected
      selectedSkins.forEach((el) => {
        if (
          el.weapon_paint_id == element.paint_index &&
          (el.weapon_defindex == weaponIds[element.weapon.id] ||
            el.model_idx == weaponIds[element.weapon.id])
        ) {
          active = "active-card";
          float = el.weapon_wear;
          pattern = el.weapon_seed;
        }
      });

      let card = document.createElement("div");
      card.classList.add("col-6", "col-sm-4", "col-md-3", "p-2");

      card.innerHTML = `
                <div onclick="changeSkin(\'${user.id}\', \'${
        weaponIds[element.weapon.id]
      }\', ${element.paint_index})" id="weapon-${
        weaponIds[element.weapon.id]
      }-${
        element.paint_index
      }" class="weapon-card rounded-3 d-flex flex-column ${active} ${bgColor} contrast-reset pb-2" data-type="skinCard" data-btn-type="${
        weaponIds[element.weapon.id]
      }-${element.paint_index}">
                    <div style="z-index: 3;" class="locked-card d-flex flex-column justify-content-center align-items-center w-100 h-100" id="locked-${
                      weaponIds[element.weapon.id]
                    }-${element.paint_index}">
                        <i class="fa-solid fa-lock"></i>
                        <p class="m-0">Buy Premium</p>
                    </div>

                
                    <div style="z-index: 3;" class="loading-card d-flex justify-content-center align-items-center w-100 h-100" id="loading-${
                      weaponIds[element.weapon.id]
                    }-${element.paint_index}">
                        <div class="spinner-border spinner-border-xl" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>

                    <button onclick="editModal(\'${element.image}\', \'${
        element.weapon.name
      }\', \'${element.pattern.name} ${phase}\', \'${element.weapon.id}\' , \'${
        element.paint_index
      }\')" style="z-index: 3;" class="settings d-flex justify-content-center align-items-center bg-light text-dark rounded-circle" data-bs-toggle="modal" data-bs-target="#patternFloat">
                        <i class="fa-solid fa-gear"></i>
                    </button>

                    <img src="${
                      element.image
                    }" class="weapon-img mx-auto my-3" loading="lazy" width="181px" height="136px" alt="${
        element.name
      }">
                    
                    <div class="d-flex align-items-center g-3">
                        <p class="m-0 ms-3 text-secondary">
                            <small class="text-roboto">
                                ${element.weapon.name}
                            </small>
                        </p>
                        <div class="skin-dot mx-2"></div>
                    </div>
                    
                    <h5 class="weapon-skin-title text-roboto ms-3">
                        ${element.pattern.name} ${phase}
                    </h5>
                </div>
            `;

      document.getElementById("skinsContainer").appendChild(card);
    }
  });
};
