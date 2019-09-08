export default class Brain {
    neuroLayers;
    neuroWeights;
    neuroBiases;
    inputSize = 4;
    outputSize = 4;
    size = 2;
    depth = 1;

    constructor(alphaBrain) {
        //this.neuroWeights = weights;
        //this.neuroBiases = biases;
        this.neuroLayers = this.initNeuroMatrix();
        this.neuroWeights = this.initWeights(alphaBrain);
    }

    initWeights(alphaBrain) {
        let weights = [];

        for (let layerIndex = 0; layerIndex < this.neuroLayers.length - 1; layerIndex++) {
            let weightsGroup = [];
            for (let groupIndex = 0; groupIndex < this.neuroLayers[layerIndex].length; groupIndex++) {
                let weightsLayer = []
                for (let weightIndex = 0; weightIndex < this.neuroLayers[layerIndex + 1].length; weightIndex++) {
                    if (alphaBrain) {
                        weightsLayer.push(alphaBrain.neuroWeights[layerIndex][groupIndex][weightIndex] + (Math.random() >= 0.5 ? 0.5 : -0.5));
                    }
                    else {
                        weightsLayer.push(Math.random()*100);
                    }
                }
                weightsGroup.push(weightsLayer);
            }
            weights.push(weightsGroup);
        }

        return weights;
    }

    makeDecision(input) {
        for (let inputIndex = 0; inputIndex < this.inputSize; inputIndex++) {
            this.neuroLayers[0][inputIndex] = input[inputIndex];
        }

        for (let layerIndex = 0; layerIndex < this.neuroWeights.length; layerIndex++) {
            for (let groupIndex = 0; groupIndex < this.neuroWeights[layerIndex].length; groupIndex++) {
                for (let weightIndex = 0; weightIndex < this.neuroWeights[layerIndex][groupIndex].length; weightIndex++) {
                    this.neuroLayers[layerIndex + 1][weightIndex] += this.neuroWeights[layerIndex][groupIndex][weightIndex] * this.neuroLayers[layerIndex][groupIndex]
                }

            }
            for (let neuronIndex = 0; neuronIndex < this.neuroLayers[layerIndex + 1].length; neuronIndex++) {
                this.neuroLayers[layerIndex + 1][neuronIndex] = Math.max(0, this.neuroLayers[layerIndex + 1][neuronIndex])
            }
        }


        return this.neuroLayers[this.depth + 1].indexOf(Math.max(...this.neuroLayers[this.depth + 1]));
    }

    initNeuroMatrix() {
        let neuroMatrix = [];

        // input layer
        neuroMatrix.push([0, 0, 0, 0])

        for (let depthIndex = 0; depthIndex < this.depth; depthIndex++) {
            let layer = [];
            for (let sizeIndex = 0; sizeIndex < this.size; sizeIndex++) {
                layer.push(0);
            }
            neuroMatrix.push(layer);
        }

        // output layer
        neuroMatrix.push([0, 0, 0, 0])

        return neuroMatrix;
    }
}