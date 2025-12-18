require("dotenv").config();

const AqcuireURL = process.env.ACQUIREURL;

const PredictURL = process.env.PREDICTURL;


async function callservices() {
  let url = AqcuireURL;

  let headers = {};

  let body = {};

  const response1 = await fetch(AqcuireURL, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body)
  });

  if (!response1.ok) {
    throw new Error(`Aquire Services Error:${response1.status}`);
  }

  const json = await response1.json();
  const result1 = json;
  console.log(result1);
  console.log(result1.features);

  url=PredictURL;
  headers={};
  body={
    features:result1.features,
    meta:{
      featureCount:result1.featureCount,
      dataId:result1.dataId,
      source:"Orquestator"
    }
  };
  const response2 = await fetch(PredictURL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body)
  });
  if (!response2.ok) {
    throw new Error(`Predict Services Error:${response2.status}`);
  }
  const json1= await response2.json();
  const result2=json1;
  const respuesta={
    dataId:result1.dataId,
    predictionId:result2.predictionId,
    prediction:result2.prediction,
    timestamp: new Date()
  }


  return respuesta;
}

module.exports = {
  callservices
};
