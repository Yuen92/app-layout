/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/

import '@polymer/iron-iconset-svg/iron-iconset-svg.js';

import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-checkbox/paper-checkbox.js';

import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';

import '@polymer/app-layout/demo/sample-content.js';
import {Polymer} from '@polymer/polymer/lib/legacy/polymer-fn.js';

import {html} from '@polymer/polymer/lib/utils/html-tag.js';
const $_documentContainer = document.createElement('template');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<iron-iconset-svg name="app" size="24">
<svg><defs>
<g id="menu"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></g>
</defs></svg>
</iron-iconset-svg>`;

document.head.appendChild($_documentContainer.content);
Polymer({
  _template: html`
    <style>

    app-drawer-layout:not([narrow]) [drawer-toggle] {
      display: none;
    }

    app-drawer section {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    app-drawer h2 {
      margin: 8px 0 0;
      padding: 18px;
      font-size: 18px;
    }

    app-drawer paper-checkbox {
      display: block;
      padding: 18px;
    }

    app-header {
      color: #fff;
      background-color: #C62828;
      --app-header-background-front-layer: {
        background-image: url(https://app-layout-assets.appspot.com/assets/test-drive.jpg);
        background-position: 50% 10%;
      };
    }

    [main-title] {
      font-size: 2em;
    }

    </style>

    <app-drawer-layout>

      <app-drawer swipe-open slot="drawer">
        <section>
          <h2>app-header Properties</h2>
          <paper-checkbox checked="{{condenses}}">
            condenses
          </paper-checkbox>
          <paper-checkbox checked="{{fixed}}">
            fixed
          </paper-checkbox>
          <paper-checkbox checked="{{reveals}}">
            reveals
          </paper-checkbox>
          <paper-checkbox checked="{{shadow}}">
            shadow
          </paper-checkbox>

          <h2>app-header Effects</h2>
          <paper-checkbox checked="{{blendBackground}}">
            blend-background
          </paper-checkbox>
          <paper-checkbox checked="{{fadeBackground}}">
            fade-background
          </paper-checkbox>
          <paper-checkbox checked="{{parallaxBackground}}">
            parallax-background
          </paper-checkbox>
          <paper-checkbox checked="{{resizeSnappedTitle}}">
            resize-snapped-title
          </paper-checkbox>
          <paper-checkbox checked="{{resizeTitle}}">
            resize-title
          </paper-checkbox>
          <paper-checkbox checked="{{waterfall}}">
            waterfall
          </paper-checkbox>
        </section>
      </app-drawer>

      <app-header-layout>

        <app-header condenses="[[condenses]]" fixed="[[fixed]]" reveals="[[reveals]]" shadow="[[shadow]]" effects="[[_computeEffects(blendBackground, fadeBackground, parallaxBackground, resizeSnappedTitle, resizeTitle, waterfall)]]" slot="header">

          <app-toolbar>
            <paper-icon-button icon="app:menu" drawer-toggle></paper-icon-button>
            <div condensed-title>Test Drive app-header</div>
          </app-toolbar>

          <app-toolbar></app-toolbar>

          <app-toolbar>
            <div main-title spacer>Test Drive</div>
          </app-toolbar>

        </app-header>

        <sample-content size="100"></sample-content>

      </app-header-layout>

    </app-drawer-layout>
`,

  is: 'test-app',

  properties: {

    condenses: {type: Boolean, value: true},

    fixed: {type: Boolean, value: true},

    reveals: {type: Boolean, value: false},

    shadow: {type: Boolean, value: false},

    blendBackground: {type: Boolean, value: true},

    fadeBackground: {type: Boolean, value: false},

    parallaxBackground: {type: Boolean, value: true},

    resizeSnappedTitle: {type: Boolean, value: false},

    resizeTitle: {type: Boolean, value: true},

    waterfall: {type: Boolean, value: true}

  },

  observers: [
    '_removeIf("fixed", reveals)',
    '_removeIf("reveals", fixed)',
    '_removeIf("shadow", waterfall)',
    '_removeIf("blendBackground", fadeBackground)',
    '_removeIf("fadeBackground", blendBackground)',
    '_removeIf("resizeSnappedTitle", resizeTitle)',
    '_removeIf("resizeTitle", resizeSnappedTitle)',
    '_removeIf("waterfall", shadow)'
  ],

  _computeEffects: function() {
    return [
      this.blendBackground ? 'blend-background ' : '',
      this.fadeBackground ? 'fade-background ' : '',
      this.parallaxBackground ? 'parallax-background ' : '',
      this.resizeSnappedTitle ? 'resize-snapped-title ' : '',
      this.resizeTitle ? 'resize-title ' : '',
      this.waterfall ? 'waterfall ' : ''
    ].join('');
  },

  _removeIf: function(propName, value) {
    if (this[propName] && value) {
      this[propName] = false;
    }
  }
});
