var join = require('path').join,
    should = require('should'),
    lwip = require('../../'),
    imgs = require('../imgs');

describe('simultaneous operations locks', function() {

    var image;

    beforeEach(function(done) {
        lwip.open(imgs.jpg.rgb, function(err, img) {
            image = img;
            done(err);
        });
    });

    describe('image.resize lock', function() {
        it('should lock image', function() {
            image.resize.bind(image, 100, 100, function() {}).should.not.throwError();
            image.scale.bind(image, 0.5, 0.5, function() {}).should.throwError();
        });
    });

    describe('image.scale lock', function() {
        it('should lock image', function() {
            image.scale.bind(image, 0.5, 0.5, function() {}).should.not.throwError();
            image.rotate.bind(image, 10, function() {}).should.throwError();
        });
    });

    describe('image.rotate lock', function() {
        it('should lock image', function() {
            image.rotate.bind(image, 10, function() {}).should.not.throwError();
            image.crop.bind(image, 10, 10, function() {}).should.throwError();
        });
    });

    describe('image.crop lock', function() {
        it('should lock image', function() {
            image.crop.bind(image, 10, 10, function() {}).should.not.throwError();
            image.blur.bind(image, 1, function() {}).should.throwError();
        });
    });

    describe('image.blur lock', function() {
        it('should lock image', function() {
            image.blur.bind(image, 1, function() {}).should.not.throwError();
            image.sharpen.bind(image, 1, function() {}).should.throwError();
        });
    });

    describe('image.sharpen lock', function() {
        it('should lock image', function() {
            image.sharpen.bind(image, 1, function() {}).should.not.throwError();
            image.mirror.bind(image, 'x', function() {}).should.throwError();
        });
    });

    describe('image.mirror lock', function() {
        it('should lock image', function() {
            image.mirror.bind(image, 'x', function() {}).should.not.throwError();
            image.border.bind(image, 10, function() {}).should.throwError();
        });
    });

    describe('image.border lock', function() {
        it('should lock image', function() {
            image.border.bind(image, 10, function() {}).should.not.throwError();
            image.pad.bind(image, 10, 10, 10, 10, function() {}).should.throwError();
        });
    });

    describe('image.pad lock', function() {
        it('should lock image', function() {
            image.pad.bind(image, 10, 10, 10, 10, function() {}).should.not.throwError();
            image.saturate.bind(image, 1, function() {}).should.throwError();
        });
    });

    describe('image.saturate lock', function() {
        it('should lock image', function() {
            image.saturate.bind(image, 1, function() {}).should.not.throwError();
            image.lighten.bind(image, 1, function() {}).should.throwError();
        });
    });

    describe('image.lighten lock', function() {
        it('should lock image', function() {
            image.lighten.bind(image, 1, function() {}).should.not.throwError();
            image.darken.bind(image, 1, function() {}).should.throwError();
        });
    });

    describe('image.darken lock', function() {
        it('should lock image', function() {
            image.darken.bind(image, 1, function() {}).should.not.throwError();
            image.hue.bind(image, 100, function() {}).should.throwError();
        });
    });

    describe('image.hue lock', function() {
        it('should lock image', function() {
            image.hue.bind(image, 10, function() {}).should.not.throwError();
            image.hslAdjust.bind(image, 100, 1, 1, function() {}).should.throwError();
        });
    });

    describe('image.hslAdjust lock', function() {
        it('should lock image', function() {
            image.hslAdjust.bind(image, 100, 1, 1, function() {}).should.not.throwError();
            image.resize.bind(image, 100, 100, function() {}).should.throwError();
        });
    });

});