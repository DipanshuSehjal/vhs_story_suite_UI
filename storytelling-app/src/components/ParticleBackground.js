import React from 'react';
import Particles from "react-tsparticles";
import { loadSeaAnemonePreset } from "tsparticles-preset-sea-anemone";

const ParticleBackground = () => {
    const particlesInit = (main) => {
        loadSeaAnemonePreset(main);
    };
    
    const options = {
        preset: "seaAnemone",
        // Add any other custom options here
    };

    return (
        <Particles className="particles" id="tsparticles" init={particlesInit} options={options} />
    );
};

export default ParticleBackground;
