/**
 * Copyright 2024 JAIL10276
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import 'wired-elements';
import "@haxtheweb/rpg-character/rpg-character.js";
/**
 * `rpg-character`
 *
 * @demo index.html
 * @element rpg-character
 */
export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    this.characterSeed = "";
    this.selectedAttribute = "";
    this.characterBaseModel = 0;
    this.characterAccessories = 0;
    this.characterName = "Default Name";
    this.characterSize = 100;
    this.characterFace = 0;
    this.characterFaceItem = 0;
    this.characterShirt = 0;
    this.characterHair = 0;
    this.characterSkin = 0;
    this.characterPants = 0;
    this.characterHatColor = 0;
    this.characterHat = 0;
    this.fire = false;
    this.walking = false;
    this.circle = false;
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-me.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  static get properties() {
    return {
      ...super.properties,
      characterName: { type: String },
      characterSeed: { type: String },
      characterAccessories: {type: Number, reflect: true },
      characterShirt: {type: Number, reflect: true },
      characterSize: { type: Number, reflect: true },
      characterFace: {type: Number, reflect: true },
      characterFaceItem: {type: Number, reflect: true },
      characterHair: {type: Number, reflect: true },
      characterSkin: {tpe: Number, reflect: true },
      characterPants: {type: Number, reflect: true },
      characterHatColor: {type: Number, reflect: true },
      characterHat: {type: String, reflect: true },
      fire: {type: Boolean, reflect: true },
      walking: {type: Boolean, reflect: true },
      circle: {type: Boolean, reflect: true },

    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
        gap: 16px;
        width: 100%;
        height: 100%;
      }

      .column {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .character-column {
        flex: 2;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .menu-section {
        border: 1px solid black;
        padding: 8px;
        height: 100px;
      }

      .character-info {
        text-align: center;
      }

      .button-row {
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
        margin-top: 16px;
      }

      .randomize-button {
        position: relative;
        top: -16px;
        left: -16px;
      }

      .slider-section {
        margin-top: 16px;
      }

      .tabs-section {
        flex: 1;
      }

      wired-tabs {
        width: 100%;
        height: 100%;
      }

      wired-tab {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px;
      }
      .icons{
        max-width: 50px;
        max-height: 50px;
        padding: 5px;
      }
      .load-icon{
        color: white;
        mix-blend-mode: difference;
        filter: invert(1);
      }
    `;
  }

  handleChangeName() {
    const newName = prompt("Enter new character name:", this.characterName);
    if (newName) {
      this.characterName = newName;
    }
  }

  firstUpdated() {
    super.firstUpdated();
    const baseCombo = this.shadowRoot.querySelector('#base');
    const hatCombo = this.shadowRoot.querySelector('#hat');
    if (baseCombo) baseCombo.value = this.base.toString();
    if (hatCombo) hatCombo.value = this.hat;
  }
  updateTab(name){
    //const tab = document.getElementById('selection-tabs'); dont use
    tab.selected = name;
  }

  render() {
    return html`
      <!-- Left Column -->
      <div class="column">
        <div class="menu-section">
          <!-- Placeholder for openable menu -->
          <p>Menu (details to be added)</p>
        </div>

        <div class="character-info">
          <h3>${this.characterName}</h3>
          <wired-button @click="${this.handleChangeName}">Change Name</wired-button>
        </div>

        <div class="button-row">
          <wired-button class="randomize-button" @click="${this.handleRandomize}">
            <img src="./lib/RandomizeDice.png" alt="Randomize" class="icons">
            Randomize
          </wired-button>
          <wired-button>
            <img src="./lib/saveDisk.png" alt="Save" class="icons">
            Save Character
          </wired-button>
          <wired-button>
            <img src="./lib/Load.png" alt="Import" class="icons" id="load-icon">
            Load Character
          </wired-button>
        </div>

        <div>
          <p>Character Seed: ${this.characterSeed || "..."}</p>
        </div>
      </div>

      <!-- Middle Column -->
      <div class="character-column">
        <div class="character">
          <rpg-character
            literalseed
            .accessories="${this.characterAccessories}"
            .base="${this.characterBaseModel}"
            .face="${this.characterFace}"
            .faceItem="${this.characterFaceItem}"
            .hair="${this.characterHair}"
            .pants="${this.characterPants}"
            .shirt="${this.characterShirt}"
            .skin="${this.characterSkin}"
            .hatColor="${this.characterHatColor}"
            .hat="${this.characterHat}"
            ?fire="${this.fire}"
            ?walking="${this.walking}"
            ?circle="${this.circle}"
            style="
                --character-size: ${this.characterSize}px;
                --hat-color: hsl(${this.characterHatColor}, 100%, 50%);
            "
          <p>Character Placeholder</p>
        </div>
        <div class="slider-section">
          <p>Size:</p>
          <wired-slider
            min="50"
            max="200"
            step="10"
            .value="${this.characterSize}"
            @change="${(e) => (this.characterSize = e.target.value)}"
          ></wired-slider>
        </div>
      </div>

      <!-- Right Column -->
      <div class="column tabs-section">
        <h3>Select Items:</h3>
        <wired-tabs id="selection-tabs" selected="0">
          <wired-button @click="${(e) => this.updateTab('base')}">Base Model</wired-button>
          <wired-button @click="${(e) => this.updateTab('gender')}">Gender</wired-button>
          <wired-button @click="${(e) => this.updateTab('skin')}">Skin</wired-button>
          <wired-button @click="${(e) => this.updateTab('hair')}">Hair</wired-button>
          <wired-button @click="${(e) => this.updateTab('cosmetics')}">Cosmetics</wired-button>
          <wired-button @click="${(e) => this.updateTab('clothing')}">Clothing</wired-button>
          <wired-button @click="${(e) => this.updateTab('build')}">Build</wired-button>
          <wired-tab name="base-model">
            <p>cards go here</p>
          </wired-tab>
          <wired-tab name="gender">

          </wired-tab>
          <wired-tab name="skin">

          </wired-tab>
          <wired-tab name="cosmetics">

          </wired-tab>
          <wired-tab name="clothing">

          </wired-tab>
          <wired-tab name="build">

          </wired-tab>
        </wired-tabs>
        <wired-checkbox>Fire</wired-checkbox>
        <wired-checkbox>Walking</wired-checkbox>
        <wired-checkbox>Circle</wired-checkbox>
      </div>
    `;
  }
}

customElements.define(RpgMe.tag, RpgMe);
/**
 * Icons retrieved from Freepik - Flaticon
 */
