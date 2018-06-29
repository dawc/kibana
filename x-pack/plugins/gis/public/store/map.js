/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import {
  SET_SELECTED_LAYER, UPDATE_LAYER_ORDER, ADD_TMS_SOURCE,
  ADD_VECTOR_SOURCE, ADD_LAYER, REMOVE_LAYER, PROMOTE_TEMPORARY_LAYERS,
  CLEAR_TEMPORARY_LAYERS, LAYER_LOADING
} from "../actions/map_actions";

const INITIAL_STATE = {
  selectedLayer: null,
  layerList: [],
  sources: [],
  layerLoading: false
};

export function map(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADD_TMS_SOURCE:
      return { ...state, sources: [...state.sources, action.tms ] };
    case ADD_VECTOR_SOURCE:
      return { ...state, sources: [...state.sources, action.vectorSource ] };
    case SET_SELECTED_LAYER:
      return { ...state, selectedLayer: state.layerList.find(
        layer => layer.id === action.selectedLayer) };
    case UPDATE_LAYER_ORDER:
      return { ...state, layerList: action.newLayerOrder.map(
        layerNumber => state.layerList[layerNumber]
      ) };
    case ADD_LAYER:
      return { ...state, ...{ layerList: [ ...state.layerList, action.layer ] } };
    case REMOVE_LAYER:
      return { ...state, ...{ layerList: [ ...state.layerList.filter(
        ({ name }) => name !== action.layerName) ] } };
    //TODO: Handle more than one
    case PROMOTE_TEMPORARY_LAYERS:
      console.log('le temps');
      const tempLayerIdx = state.layerList.findIndex(({ temporary }) => temporary);
      const newLayer = { ...state.layerList[tempLayerIdx], temporary: false };
      const newLayerList = [...state.layerList.slice(0, tempLayerIdx), newLayer,
        ...state.layerList.slice(tempLayerIdx + 1) ];
      return { ...state, ...{ layerList: newLayerList } };
    case CLEAR_TEMPORARY_LAYERS:
      return { ...state, ...{ layerList: [ ...state.layerList.filter(
        ({ temporary }) => !temporary) ] } };
    case LAYER_LOADING:
      return { ...state, layerLoading: action.loadingBool };
    default:
      return state;
  }
}
