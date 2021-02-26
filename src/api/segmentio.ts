/* eslint-disable import/prefer-default-export */
import { User } from "firebase";

import { Organization } from "@types/models";

// const segment = window ? window.analytics : undefined;

const identifyUser = (user: User): void => {
  try {
    window.analytics.identify(user.uid, user);
  } catch {
    console.log("cloudn't track: identify");
  }
};

const trackEvent = (eventname: string, payload): void => {
  try {
    window.analytics.track(eventname, payload);
    console.log("tracked: ", eventname, payload);
  } catch (error) {
    console.log(`couldn't track: + ${eventname} with error: ${error}`);
  }
};

const trackCompany = (oid: string, organization: Organization) => {
  try {
    window.analytics.group(oid, organization);
  } catch (error) {
    console.log(`couldn't track org: + ${organization} with error: ${error}`);
  }
};

export { identifyUser, trackCompany, trackEvent };
