
type PayloadType = { [key: string]: any };

class AnalyticsService {

  async sendAlaytics(type: String, payload: PayloadType) {

    const analyticsObject = {
      type,
      payload,
      timestamp: Math.floor(Date.now() / 1000)
    };

    await fetch('/api/sendEvent', {
      method: 'POST',
      body: JSON.stringify(analyticsObject)
    });

    console.log(analyticsObject);
  }

}

export const analyticsService = new AnalyticsService();
