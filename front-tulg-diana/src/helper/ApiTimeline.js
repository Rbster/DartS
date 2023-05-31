import axios from 'axios';
import BlockContentCard from '../components/BlockContentCard';

export default class ApiTimeline {
    constructor() {
      this.api_token = null;
      this.client = null;
    //   this.api_url = process.env.REACT_APP_API_ENDPOINT;
      this.api_url = "http://127.0.0.1:50505";

    }
    init = () => {
    //   this.api_token = getCookie("ACCESS_TOKEN");
      let headers = {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
      };
      if (this.api_token) {
        headers.Authorization = `Bearer ${
          this.api_token
        }`;
      }
      
      this.client = axios.create({baseURL: this.api_url, timeout: 31000, headers: headers});
      return this.client;
    };
    
    // getContentBlockData = (chapterId) => {
    //   return this.init().get(`/api/chapter/${chapterId}`);
    // };
    // addNewUser = (data) => {
    //   return this.init().post("/users", data);
    // };

    // getLongreadsList = () => {
    //     return this.init().get("/api/explore/");
    // };

    getLongreadEvents = (longreadId) => {
        return this.init().get(`/api/events/${longreadId}`);
    };

    editEvent = (blockContentId, eventData) => {
      return this.init().post(`/api/event/edit/${blockContentId}`, eventData);
    }

    deleteEvent = (blockContentId) => {
      return this.init().delete(`/api/event/delete/${blockContentId}`);
    }
  }