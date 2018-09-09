/* global expect, Function, spyOn */

import { Request } from './request';

describe('Request', () => {
  let main;
  let inst;

  beforeEach(() => {
    main = {
      config: {apiUrl: 'test'},
      user: {sessionId: 'test'}
    };
    inst = new Request(main);
  });

  it('should exist and have defaults', function() {
    expect(inst).toEqual(jasmine.any(Object));
    expect(inst.main).toEqual(main);
  });

  describe('Function: get', () => {
    it('should exist', function() {
      expect(inst.get).toEqual(jasmine.any(Function));
    });
    it('should call send', function() {
      spyOn(inst, 'send');
      inst.get('path');
      expect(inst.send).toHaveBeenCalledWith('get', 'path');
    });
  });

  describe('Function: post', () => {
    it('should exist', function() {
      expect(inst.post).toEqual(jasmine.any(Function));
    });
    it('should call send', function() {
      spyOn(inst, 'send');
      inst.post('path', {test: 1});
      expect(inst.send).toHaveBeenCalledWith('post', 'path', {test: 1});
    });
  });

  describe('Function: onReadyStateChange', () => {
    let resolve;
    let reject;
    let xhttp;
    beforeEach(() => {
      xhttp = {readyState: 4, status: 200, responseText: '{"success":true,"data":{"test":1}}'};
      resolve = jasmine.createSpy('resolve');
      reject = jasmine.createSpy('reject');
    });
    it('should exist', function() {
      expect(inst.onReadyStateChange).toEqual(jasmine.any(Function));
    });
    it('should not call resolve/reject if readyState !== 4', function() {
      xhttp.readyState = 0;
      inst.onReadyStateChange(xhttp, resolve, reject);
      expect(resolve).not.toHaveBeenCalled();
      expect(reject).not.toHaveBeenCalled();
    });
    it('should call reject if status !== 200', function() {
      xhttp.status = 500;
      inst.onReadyStateChange(xhttp, resolve, reject);
      expect(reject).toHaveBeenCalledWith(new Error('Response status incorrect'));
    });
    it('should call reject if response can not be parsed', function() {
      xhttp.responseText = '-';
      inst.onReadyStateChange(xhttp, resolve, reject);
      expect(reject).toHaveBeenCalledWith(new Error('Response parse error'));
    });
    it('should call reject if response is failed', function() {
      xhttp.responseText = '{"success":false}';
      inst.onReadyStateChange(xhttp, resolve, reject);
      expect(reject).toHaveBeenCalledWith(new Error('Response is not successfull'));
    });
    it('should call reject if response is failed (empty)', function() {
      xhttp.responseText = '0';
      inst.onReadyStateChange(xhttp, resolve, reject);
      expect(reject).toHaveBeenCalledWith(new Error('Response is not successfull'));
    });
    it('should call resolve if everything ok', function() {
      inst.onReadyStateChange(xhttp, resolve, reject);
      expect(resolve).toHaveBeenCalledWith({test: 1});
    });
  });

  describe('Function: send', () => {
    let xhttp;
    beforeEach(() => {
      XMLHttpRequest = class {constructor() { return xhttp = this; }};
      XMLHttpRequest.prototype.open = jasmine.createSpy('open');
      XMLHttpRequest.prototype.setRequestHeader = jasmine.createSpy('setRequestHeader');
      XMLHttpRequest.prototype.send = jasmine.createSpy('send');
      XMLHttpRequest.prototype.triggerOnReadyStateChange = function () { this.onreadystatechange(); };
    });
    it('should exist', function() {
      expect(inst.send).toEqual(jasmine.any(Function));
    });
    it('should open request', function() {
      inst.send('get', 'path', {test: 1});
      expect(XMLHttpRequest.prototype.open).toHaveBeenCalledWith('GET', 'test/path', true);
    });
    it('should set auth header', function() {
      inst.send('get', 'path', {test: 1});
      expect(XMLHttpRequest.prototype.setRequestHeader).toHaveBeenCalledWith('Authorization', 'test');
    });
    it('should not set auth header', function() {
      inst.main.user = null;
      inst.send('get', 'path', {test: 1});
      expect(XMLHttpRequest.prototype.setRequestHeader).not.toHaveBeenCalled();
    });
    it('should send request', function() {
      inst.send('get', 'path', {test: 1});
      expect(XMLHttpRequest.prototype.send).toHaveBeenCalledWith(undefined);
    });
    it('should send request (post)', function() {
      inst.send('post', 'path', {test: 1});
      expect(XMLHttpRequest.prototype.send).toHaveBeenCalledWith('{"test":1}');
    });
    it('should send request (post, no data)', function() {
      inst.send('post', 'path');
      expect(XMLHttpRequest.prototype.send).toHaveBeenCalledWith('{}');
    });
    it('should call onReadyStateChange', function() {
      spyOn(inst, 'onReadyStateChange');
      inst.send('get', 'path', {test: 1});
      xhttp.onreadystatechange();
      expect(inst.onReadyStateChange).toHaveBeenCalledWith(xhttp, jasmine.any(Function), jasmine.any(Function));
    });
  });
});
