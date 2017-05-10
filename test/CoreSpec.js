var _ = require('../martine').default;
var expect = require('chai').expect;
var jsdom = require('jsdom');

describe('martine', () => {

    describe('#core', () => {

        it('should exist', () => {
            
            expect(_.query).to.exist;
            
        });


    });

    describe('#query', () => {

        it('should be a function', () => {

            var document = jsdom.jsdom('<div>Div</div>');
            expect(_.query).to.be.a('function');

        });

        it('should return an element if in the dom', () => {

            var document = jsdom.jsdom('<div>Div</div>');
            expect(_.query('div', document)).to.be.a('object');

        });

        it('should return null if not in the dom', () => {

            var document = jsdom.jsdom('<div>No p</div>');
            expect(_.query('p', document)).to.be.a('null');

        });

    });

    describe('#queryAll', () => {

        it('expect queryAll to be a function', () => {

            var document = jsdom.jsdom('<div>Div</div>');
            expect(_.queryAll).to.be.a('function');

        });

        it('expect queryAll to have a length of 1', () => {

            var document = jsdom.jsdom('<div>Div</div>');
            expect(_.queryAll('div', document)).to.have.length(1);

        });

        it('expect queryAll to have a length of 3', () => {

            var document = jsdom.jsdom('<div>Div</div><div>Div</div><div>Div</div>');
            expect(_.queryAll('div', document)).to.have.length(3);

        });

    });

    describe('#escapeHtml', () => {

        it('should be a function', () => {

            expect(_.escapeHtml).to.be.a('function');

        });

        it('should escape HTML', () => {
            
            expect(_.escapeHtml('<hello>hello</hello>')).to.equal('&lt;hello&gt;hello&lt;/hello&gt;');

        });


    });

    describe('#random', () => {

        it('should be a function', () => {

            expect(_.random).to.be.a('function');

        });

        it('should be a number', () => {
            
            expect(_.random(5, 20)).to.be.a('number');

        });

        it('should be between 5 and 20', () => {
            
            expect(_.random(5, 20)).to.be.within(5,20);

        });

    });

    describe('#sample', () => {

        it('should be a function', () => {

            expect(_.sample).to.be.a('function');

        });

        it('should not return an array', () => {
            
            expect(_.sample(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'])).to.not.be.a('array');

        });

    });


    
    describe('#addCookie', () => {

        it('should be a function', () => {

            expect(_.addCookie).to.be.a('function');

        });

    });

        
    describe('#removeCookie', () => {

        it('should be a function', () => {

            expect(_.removeCookie).to.be.a('function');

        });

    });

        
    describe('#removeCookie', () => {

        it('should be a function', () => {

            expect(_.removeCookie).to.be.a('function');

        });

    });

    describe('#debounce', () => {

        it('should be a function', () => {

            expect(_.debounce).to.be.a('function');

        });

    });

    describe('#each', () => {

        it('should be a function', () => {

            expect(_.each).to.be.a('function');

        });

    });

    describe('#extend', () => {

        it('should be a function', () => {

            expect(_.extend).to.be.a('function');

        });

    });


    describe('#getParameter', () => {

        it('should be a function', () => {

            expect(_.getParameter).to.be.a('function');

        });

        it('should return goodbye', () => {

            expect(_.getParameter('hello', 'https://www.google.co.uk/?hello=goodbye')).to.equal('goodbye');

        });

    });

    describe('#log', () => {

        it('should be a function', () => {

            expect(_.log).to.be.a('function');

        });

    });

    describe('#trigger', () => {

        it('should be a function', () => {

            expect(_.trigger).to.be.a('function');

        });

    });

    describe('#viewport', () => {

        it('should be a function', () => {

            expect(_.viewport).to.be.a('function');

        });

    });

    describe('#ajax', () => {

        it('should be a function', () => {

            expect(_.ajax).to.be.a('function');

        });

    });

   describe('#isHidden', () => {

        it('should be a function', () => {

            expect(_.isHidden).to.be.a('function');

        });

    });

    describe('#poll', () => {

        it('should be a function', () => {

            expect(_.poll).to.be.a('function');

        });

    });
    
});
