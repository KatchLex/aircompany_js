const assert = require('chai').assert;

const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const ExperimentalPlane = require('../Planes/experimentalPlane');
const experimentalType = require('../models/experimentalType');
const militaryType = require('../models/militaryType');
const classificationLevel = require('../models/classificationLevel');

let planes = [
    new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
    new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
    new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
    new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
    new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
    new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
    new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
    new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
    new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, militaryType.typeBomber),
    new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, militaryType.typeBomber),
    new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, militaryType.typeBomber),
    new MilitaryPlane('F-15', 1500, 12000, 10000, militaryType.typeFighter),
    new MilitaryPlane('F-22', 1550, 13000, 11000, militaryType.typeFighter),
    new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, militaryType.typeTransport),
    new ExperimentalPlane("Bell X-14", 277, 482, 500, experimentalType.highAltitude, classificationLevel.secret),
    new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, experimentalType.vtol, classificationLevel.topSecret)
    ];
    
    it('should have military planes with transport type', () => {
        let airport = new Airport(planes);
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        assert.isTrue(transportMilitaryPlanes[0].getMilitaryType() == militaryType.typeTransport);
    });

    it('should have passenger plane with max passenger capacity', () => {
        let airport = new Airport(planes);
        let expectedPlaneWithMinPassengerCapacity = new PassengerPlane('Embraer 190', 870, 8100, 30800, 64);
        assert.isTrue(expectedPlaneWithMinPassengerCapacity != airport.getPassengerPlaneWithMaxPassengerCapacity());
    });

    it('should have military planes with bomber type', () => {
        let airport = new Airport(planes);
        let bomberMilitaryPlanes = airport.getBomberMilitaryPlanes();
        assert.isTrue(bomberMilitaryPlanes[0].getMilitaryType() == militaryType.typeBomber);
    });

    it('experimental planes classification level should not be unclassified', () => {
        let airport = new Airport(planes);
        let experimentalPlanes = airport.getExperimentalPlanes();
        assert.isTrue(experimentalPlanes.classificationLevel != classificationLevel.unclassified);
    });