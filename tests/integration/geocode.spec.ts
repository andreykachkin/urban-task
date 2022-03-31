import { expect } from 'chai';
import * as sinon from 'sinon';
import * as request from 'supertest';
import { app } from '../../app';
import * as GeocodeProvider from '../../app/lib/coordinates/providers';

describe('geo-location', () => {
  describe('should return a error', () => {
    it('should return a NOT_FOUND error', async () => {
      const { status, body } = await request(app)
        .get('/geolocation?address=testingaddress')
        .send();

      expect(status).to.eq(404);
      expect(body).to.deep.eq({
        search: "Non-existing address",
        status: "ADDRESS_NOT_FOUND"
      });
    });

    it('should return a NOT_SERVICED error', async () => {
      const { status, body } = await request(app)
        .get('/geolocation?address=york')
        .send();

      expect(status).to.eq(400);
      expect(body).to.deep.eq({
        search: "Non-serviced address",
        status: "ADDRESS_NOT_SERVICED"
      });
    });

    it('should return a valdation error', async () => {
      const { status, body } = await request(app)
        .get('/geolocation')
        .send();

      expect(status).to.eq(400);
      expect(body).to.deep.eq({
        status: 'ADDRESS_REQUIRED',
        search: 'Address parameter is required',
      });
    });
  })

  describe('should return a valid response', () => {
    beforeEach(() => {
      sinon.stub(GeocodeProvider, 'geocode').resolves({
        lat: 51.547133,
        lng: -0.005668,
        address1: 'testing address1',
        address2: 'testing address2',
        city: 'LONDON',
      });
    });

    it('should return a valid service area', async () => {
      const {status, body} = await request(app)
        .get('/geolocation?address=testingaddress')
        .send();

      expect(status).to.eq(200);
      expect(body).to.deep.eq({
        search: 'testingaddress',
        status: 'OK',
        location: {
          address1: 'testing address1',
          address2: 'testing address2',
          city: 'LONDON',
          lat: 51.547133,
          lng: -0.005668,
          serviceArea: 'LONEAST',
        },
      });
    });
  })
});
