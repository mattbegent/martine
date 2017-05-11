const _ = require('../martine').default;
const expect = require('chai').expect;
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('martine', () => {

    describe('#core', () => {

        it('should exist', () => {
            
            expect(_.query).to.exist;
            
        });


    });

    describe('#query', () => {

        it('query should be a function', () => {

            expect(_.query).to.be.a('function');

        });

        it('should return an element if in the dom', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div>');
            const document = dom.window.document;
            expect(_.query('div', document)).to.be.a('HTMLDivElement');

        });

        it('should return null if not in the dom', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>No p</div>');
            const document = dom.window.document;
            expect(_.query('p', document)).to.be.a('null');

        });

    });

    describe('#queryAll', () => {

        it('should be a function', () => {

            expect(_.queryAll).to.be.a('function');

        });

        it('should return a length of 0 when no elements found', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div>');
            const document = dom.window.document;
            expect(_.queryAll('.not-there', document)).to.have.length(0);

        });

        it('should return a length of 1 when one element found', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div>');
            const document = dom.window.document;
            expect(_.queryAll('div', document)).to.have.length(1);

        });

        it('should return a length of 3 when three elements found', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div><div>Div</div><div>Div</div>');
            const document = dom.window.document;
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

        it('should ignore strings with no html in them', () => {
            
            expect(_.escapeHtml('hello')).to.equal('hello');

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

        it('should add a cookie to the document', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div>');
            const document = dom.window.document;
            
            _.addCookie('bob', 'yes', 1, document);

            expect(_.readCookie('bob', document)).to.equal('yes');

        });

        it('should add a cookie to the document and have the correct value', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div>');
            const document = dom.window.document;
            
            _.addCookie('bob', 'yes', 1, document);

            expect(_.readCookie('bob', document)).not.to.equal('no');

        });

    });

        
    describe('#removeCookie', () => {

        it('should be a function', () => {

            expect(_.removeCookie).to.be.a('function');

        });

        it('should remove cookie', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div>');
            const document = dom.window.document;
            
            _.addCookie('bob', 'yes', 1, document);
            _.removeCookie('bob', document);

            expect(_.readCookie('bob', document)).to.be.undefined;

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

        it('should return an object', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div>');
            const document = dom.window.document;

            expect(_.viewport(dom.window, document)).to.be.a('object');

        });

        it('should return width as a number', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div>');
            const document = dom.window.document;

            expect(_.viewport(dom.window, document).width).to.be.a('number');

        });

        it('should return height as a number', () => {

            const dom = new JSDOM('<!DOCTYPE html><div>Div</div>');
            const document = dom.window.document;
            expect(_.viewport(dom.window, document).height).to.be.a('number');

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
