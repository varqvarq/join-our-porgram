const startLoad = performance.now();
const analytics = []  ;

window.addEventListener('load', async () => {
  const endLoad = performance.now();
  const pageLoadTime = endLoad - startLoad;
  const memoryUsage = performance.memory;

  performance.mark('fetch-start');
  let fetchPerformance = '';  
  
  try {
    await fetch('api/community');
    performance.mark('fetch-end');
  } catch (e){
    fetchPerformance = 'error';
  }
  
  performance.measure('fetch-duration', 'fetch-start', 'fetch-end');

  fetchPerformance = performance.getEntriesByName('fetch-duration')[0].duration;

  analytics.push({
    'pageLoadTime': `${pageLoadTime} ms`,
    'memoryUsage': {
      'jsHeapSizeLimit': `${memoryUsage.jsHeapSizeLimit / 1024 / 1024}Mb`,
      'totalJSHeapSize': `${memoryUsage.totalJSHeapSize / 1024 / 1024}Mb`,
      'userJSHeapSize': `${memoryUsage.usedJSHeapSize / 1024 / 1024}Mb`,
    },
    'fetchPerformance': {
      'endpoint': 'community',
      'duration': `${fetchPerformance} ms`
    }
  }) 
})

if(analytics){
  window.addEventListener('visibilitychange', e => {
    const jsonData = JSON.stringify(analytics);
  
    fetch('api/analytics/performance', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData
    })
  })
}
