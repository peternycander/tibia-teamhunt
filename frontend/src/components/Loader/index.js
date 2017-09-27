import React from 'react';
import {Loader as ReactLoader} from 'react-loaders';
import 'loaders.css/loaders.min.css';
import './loader.css';

export default function Loader() {
  return <ReactLoader type='ball-scale-ripple' />;
}
