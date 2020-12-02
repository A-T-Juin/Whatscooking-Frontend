import {
  Environment,
  Network,
  Observable,
  RecordSource,
  Store
} from 'relay-runtime';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const subscriptionClient = new SubscriptionClient('ws://localhost:3000', {
  reconnect: true,
});

const subscribe = (request, variables) => {
  const subscribeObservable = subscriptionClient.request({
    query: request.text,
    operationName: request.name,
    variables,
  });
  return Observable.from(subscribeObservable);
}

const FetchQuery = (operation, variables, cacheConfig, uploadables) => {

  let request = {
    method: 'POST',
    "headers": {},
    "body": {}
  }

  if(uploadables) {

    if(!window.FormData) {
      throw new Error('Uploading files without `FormData` not supported')
    }
    const formData = new FormData()
    formData.append('query', operation.text)
    formData.append('variables', JSON.stringify(variables))
    formData.append('picture', uploadables)
    Object.keys(uploadables).forEach(key => {
      if (Object.prototype.hasOwnProperty.call(uploadables, key)) {
        formData.append(key, uploadables[key])
      }
    });
    for (var pair of formData.entries()){
      console.log(pair[0] + ', ' + pair[1])
    }
    request.body = formData
  } else {
    request.headers['Content-Type'] = 'application/json';
    request.body = JSON.stringify({
      query: operation.text,
      variables,
    });
  }
  return fetch("http://localhost:8000/graphql/", request)
  .then(response => {
    if (response.status === 200) {
      return response.json()
    }
  })
  .catch(error => {
    console.log("errors: ", error)
  })
}

const source = new RecordSource()
const store = new Store(source)

const environment = new Environment({
  network: Network.create(FetchQuery, subscribe),
  store
})
export default environment;
