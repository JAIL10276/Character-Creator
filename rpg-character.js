/**
 * Copyright 2024 JAIL10276
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { WiredButton } from 'wired-elements/lib/wired-button.js';
import { WiredSlider } from 'wired-elements/lib/wired-slider.js';
/**
 * `rpg-character`
 *
 * @demo index.html
 * @element rpg-character
 */
export class RpgCharacter extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-character";
  }

  constructor() {
    super();
    this.characterSeed = "";
    this.selectedAttribute = "";
    this.characterName = "Default Name";
    this.characterSize = 100;
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/rpg-character.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  static get properties() {
    return {
      ...super.properties,
      characterName: { type: String },
      characterSeed: { type: String },
      characterSize: { type: Number },
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
    `;
  }

  handleChangeName() {
    const newName = prompt("Enter new character name:", this.characterName);
    if (newName) {
      this.characterName = newName;
    }
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
            Randomize
          </wired-button>
          <wired-button>Save Character</wired-button>
          <wired-button>Load Character</wired-button>
        </div>

        <div>
          <p>Character Seed: ${this.characterSeed || "..."}</p>
        </div>
      </div>

      <!-- Middle Column -->
      <div class="character-column">
        <div class="character">
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
        <wired-tabs selected="0">
          <wired-tab name="Hair">
            <wired-button>Option 1</wired-button>
            <wired-button>Option 2</wired-button>
            <wired-button>Option 3</wired-button>
          </wired-tab>
          <wired-tab name="Face">
            <wired-button>Option A</wired-button>
            <wired-button>Option B</wired-button>
            <wired-button>Option C</wired-button>
          </wired-tab>
          <wired-tab name="Body">
            <wired-button>Thin</wired-button>
            <wired-button>Muscular</wired-button>
            <wired-button>Large</wired-button>
          </wired-tab>
          <wired-tab name="Body Color">
            <!--This contains different skin colors-->
            <wired-button>Red</wired-button>
            <wired-button>Blue</wired-button>
            <wired-button>Green</wired-button>
          </wired-tab>
        </wired-tabs>
      </div>
    `;
  }
}

customElements.define(RpgCharacter.tag, RpgCharacter);
