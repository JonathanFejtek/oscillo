//-------------------------------------------------------------------------------------------------------------//
//                                          Basic Program Flow                                                 //
//     UserInput -> PartialViewController -> HarmonicSummator -> WavePreviewGraph/PhasePortrait                //
//     UserInput -> CurveController -> PhasePortrait                                                           //
//     UserInput -> PresetManager -> PartialViewController/CurveController -> ....                             //

//-------------------------------------------------------------------------------------------------------------//

let oscillo = {};


oscillo.setupComponents = function(){
    // -- setup canvases (view) --
    // create main canvas for phase portrait render
    oscillo.svgc = new SVGCanvas("100%","56%","canvas-container");
    // create canvas for sine wave preview
    oscillo.sinePreviewCanvas = new SVGCanvas("100%","40%","sinePreviewCanvas");
    // create canvas for cosine wave preview
    oscillo.cosPreviewCanvas = new SVGCanvas("100%","40%","cosPreviewCanvas");

    // -- setup view-controllers --
    // view-controller for partials/series
    oscillo.pvc = new PartialViewController(document.getElementById("slider-group-container"),64);
    // view-controller for curve options
    oscillo.curveController = new CurveViewController(document.getElementById("curve-controls"));

    // -- setup summators (model) --
    // summator for sine series
    oscillo.hs1 = new HarmonicSummator(oscillo.pvc.getSineController());
    // summator for cosine series
    oscillo.hs2 = new HarmonicSummator(oscillo.pvc.getCosController());

    // -- setup renderers (view) --
    // renderer for sine wave preview
    oscillo.sineWavePreview = new WavePreviewGraph(oscillo.hs1,"sine",oscillo.sinePreviewCanvas);
    // renderer for cos wave preview
    oscillo.cosWavePreview = new WavePreviewGraph(oscillo.hs2,"cos",oscillo.cosPreviewCanvas);
    // renderer for phase portrait
    oscillo.phasePortrait = new PhasePortrait(oscillo.hs1,oscillo.hs2,oscillo.curveController,oscillo.svgc);

    // controller for setting presets
    oscillo.presetController = new PresetManager(document.getElementById("pc"));

    oscillo.presetController.manage(oscillo.curveController);
    oscillo.presetController.manage(oscillo.pvc);

    //setup initial size of canvases
    oscillo.svgc.handleResize();
    oscillo.sinePreviewCanvas.handleResize();
    oscillo.cosPreviewCanvas.handleResize();

    //setup listeners for svg canvas resizing
    window.addEventListener("resize",oscillo.svgc.handleResize.bind(oscillo.svgc));
    window.addEventListener("resize",oscillo.phasePortrait.drawCurve.bind(oscillo.phasePortrait));
    window.addEventListener("resize",oscillo.sinePreviewCanvas.handleResize.bind(oscillo.sinePreviewCanvas));
    window.addEventListener("resize",oscillo.cosPreviewCanvas.handleResize.bind(oscillo.cosPreviewCanvas));
    window.addEventListener("resize",oscillo.sineWavePreview.update.bind(oscillo.sineWavePreview));
    window.addEventListener("resize",oscillo.cosWavePreview.update.bind(oscillo.cosWavePreview));
}

oscillo.setupPresets = function(){
    oscillo.presetController.addPreset("Default (A Stupid Circle)",[1],[1],2,2,2000,5,100);

    oscillo.presetController.addPreset("Spikey Nike",[1, 0, 0, 0.59375, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0.15625, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[1, 0, 0, 0.59375, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0.15625, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],2,2,176,10,240);

    oscillo.presetController.addPreset("Blake",[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],2,2,306,2,240);

    oscillo.presetController.addPreset("Sniffalie",[1, 0, 0, 0.3125, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3125, 0, 0, 0, 0, 0],[1, 0, 0, 0.3125, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.3125, 0, 0, 0, 0, 0],5,5,345,5,306);


    oscillo.presetController.addPreset("James Gandalfini",[1,0,0,0,0.5625,0,0,0.3125,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.15625],[1,0,0,0,0.5625,0,0,0.3125,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0.15625],8,8,176,4,222);
}


$(function(){  
    oscillo.setupComponents();
    oscillo.setupPresets(); 
}
)

