/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat.js';

import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/iron-flex-layout/iron-flex-layout-classes.js';
import '@polymer/iron-ajax/iron-ajax.js';

import { menuIcon } from './my-icons.js';

import { connect } from 'pwa-helpers/connect-mixin.js';
//import { installRouter } from 'pwa-helpers/router.js';
//import { installOfflineWatcher } from 'pwa-helpers/network.js';
//import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

import { store } from '../store.js';
import { navigate, updateLayout } from '../actions/app.js';

class ResearchDemos extends connect(store)(LitElement) {
  _render({resultaat, appTitle}) {
    // Anything that's related to rendering should be done in here.
    return html`
    <style is="custom-style">
            :host {
                display: block;
                --geodan-regular-font: 'Open Sans Regular';
                --geodan-light-font: 'Open Sans',sans-serif;
                --geodan-heading1-fontsize: 36px;
                --geodan-heading2-fontsize: 24px;
                --geodan-heading3-fontsize: 17px;
                --geodan-light-fontweight: 300;
                --geodan-color: #333333;
        
                --geodan-button-normal: #ED3031;
                --geodan-button-hover:  #D60000;
                --geodan-button-pressed: #BB0C16;
                --geodan-button-disabled: #ECECEC;
                --geodan-button-corner-radius: 4px;
        
                --geodan-checkbox-unckeched: #E3E2E3;
                --geodan-checkbox-checked: #ED3031;
        
                --geodan-header-background:  #424242;
                
                color: var(--geodan-color);
            }
            
            h1 {
                font-family: var(--geodan-regular-font);
                font-size: var(--geodan-heading1-fontsize);
            }
            h2 {
                font-family: var(--geodan-regular-font);
                font-size: var(--geodan-heading2-fontsize);
            }
            h3 {
                font-family: var(--geodan-regular-font);
                font-size: var(--geodan-heading3-fontsize);
            }
        
            .title {
                font-family: var(--geodan-regular-font);
                font-size: var(--geodan-heading1-fontsize);
            }
            paper-button.geodan {
                background:var(--geodan-button-normal);
                color:white;
                border-radius:var(--geodan-button-corner-radius); 
                --paper-button-ink-color: var(--geodan-button-normal);
                --paper-button-disabled: var(--geodan-button-disabled);
            }
            paper-button.geodan:hover {
                background:var(--geodan-button-hover);
            }
        
            paper-button.geodan a{
                color: white;
            }
            paper-icon-button {
                color: var(--geodan-button-normal);
                --paper-icon-button-ink-color: var(--geodan-button-normal);
            }
        
            a {
                text-decoration: none;
                color: var(--geodan-color);
            }
        
            app-header {
                height: 80px;
            }
        
            app-toolbar {
                background: var(--geodan-header-background);
                color: white;
                --app-toolbar-font-size: 18px;
                font-family: var(--geodan-light-font);
                font-weight: var(--geodan-light-fontweight);
                height: 80px;
            }
        
            paper-tab {
                --paper-tab-ink: var(--geodan-button-normal);
            }
        
            paper-tabs {
                --paper-tabs-selection-bar-color: var(--geodan-button-normal);
        
            }
        
            paper-checkbox {
                --paper-checkbox-unchecked-color: var(--geodan-checkbox-unchecked);
                --paper-checkbox-unchecked-ink-color: var(--geodan-checkbox-checked);
                --paper-checkbox-checked-color: var(--geodan-checkbox-checked);
                --paper-checkbox-checked-ink-color: var(--geodan-checkbox-unchecked);
                --paper-checkbox-checkmark-color: white;
            }
        </style>    
    <style include="iron-flex iron-flex-alignment">
      :host {
        --app-drawer-width: 256px;
        display: block;

        --app-primary-color: #E91E63;
        --app-secondary-color: #293237;
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
        --app-section-even-color: #f7f7f7;
        --app-section-odd-color: white;

        --app-header-background-color: white;
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);

        --app-drawer-background-color: var(--app-secondary-color);
        --app-drawer-text-color: var(--app-light-text-color);
        --app-drawer-selected-color: #78909C;
      }
      app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        text-align: center;
        /*background-color: var(--app-header-background-color);
        color: var(--app-header-text-color);*/
        border-bottom: 1px solid #eee;
      }

      .toolbar-top {
        /*background-color: var(--app-header-background-color);*/
      }

      [main-title] {
        font-family: 'Pacifico';
        text-transform: lowercase;
        font-size: 30px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
      }

      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
      }

      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }

      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
      }

      .main-content {
        padding-top: 64px;
        min-height: 100vh;
      }
  
      footer {
        padding: 24px;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }

      /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout. */
      @media (min-width: 460px) {

        .menu-btn {
          display: none;
        }

        .main-content {
          padding-top: 107px;
        }

        /* The drawer button isn't shown in the wide layout, so we don't
        need to offset the title */
        [main-title] {
          padding-right: 0px;
        }

        .demo {
            display: inline-block;
            vertical-align: top;
            width: 200px;
            cursor: pointer;
            margin: 5px;
            background: white;
            border-radius: 4px;
        }
        .papercard {
            perspective: 500px;
            @apply --shadow-elevation-6dp; 
        }
        
        .papercard:hover .card-content {
            transform: rotateY( 180deg ) ;
            transition: transform 0.5s;
        }

        .card-content {
            transition: transform 1s;
            transform-style: preserve-3d;
            backface-visibility: hidden;
            height: 250px;
        }
        .card-content img {
            height: 100%;
            width: 100%;
        }


        .frontside, .backside {
            backface-visibility: hidden;
        }
        
        .backside {
            position: absolute;
            top: 5px;
            padding: 5px;
            transform: rotateY( 180deg );
        }
        
      }
    </style>
    
    <app-header condenses reveals effects="waterfall">
      <app-toolbar class="toolbar-top">
        <a href="https://www.geodan.nl"><img src="images/Geodan_logo_rgb.png" height="80px"></a>
        <div main-title>${appTitle}</div>
      </app-toolbar>
    </app-header>
  
    <main class="main-content">
      <div class='layout horizontal start-justified wrap'>

      ${repeat(resultaat || [], (demo) => demo.title, (demo, index) => html`
              <a class="demo" href="${demo.url}" style="display:${demo.disabled?"none":"inline-block"}">
              <div class="papercard"
                  heading="" 
                  alt="${demo.title}">
                  <div class="card-content">
                      <div class="frontside">
                          ${demo.thumbnail.endsWith('mp4')?html`
                              <video src="${demo.thumbnail}" width="100%" height="100%" autoplay="" loop=""></video>
                          `:html`
                              <img src="${demo.thumbnail}"/>
                          `}
                          <div>${demo.title}</div>
                          <div class="date"><small><i>${demo.date}</i></small></div>
                      </div>
                      <div class="backside">
                          ${demo.description}
                      </div>
                  </div>
              </div>
              
              </a>
          
      `)}
      </div>
      
    </main>
    </app-drawer-layout>
    
    <footer>
      <p>Geodan research 2018</p>
    </footer>

    <iron-ajax id="getConfig" 
      auto="" 
      url="config/config.json" 
      handle-as="json" 
      on-response="${(e)=>this.handleResponse(e)}"
      withcredentials="true"></iron-ajax>
    
    `;
}

static get properties() {
  return {
    appTitle: String,
    _drawerOpened: {
      type: Boolean,
      value: true
    },
    resultaat: Array
  }
}

constructor() {
  super();
  // To force all event listeners for gestures to be passive.
  // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
  setPassiveTouchGestures(true);
}
_stateChanged(){

}
handleResponse(d) {
    var taglist ={};        
    this.demos = d.detail.response;             
    this.demos.forEach(function(d){
        d.tags=d.tags?d.tags:[];
        d.thumbnail=d.thumbnail?d.thumbnail:"blank.gif";
        if(!d.disabled)d.tags.push(d.title);
        d.tags.forEach(function(t){
            if(taglist[t]===undefined){
                taglist[t] = {tag:t,demos:[d]}
            }
            else {
                taglist[t].demos.push(d)
            }
        })
    });
    this.resultaat = d.detail.response;
    this.tags= taglist;        
}
}

window.customElements.define('research-demos', ResearchDemos);