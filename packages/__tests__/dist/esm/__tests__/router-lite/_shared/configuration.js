import { Registration, LoggerConfiguration, ConsoleSink } from '@aurelia/kernel';
import { MockBrowserHistoryLocation } from '@aurelia/testing';
import { IRouter } from '@aurelia/router-lite';
import { AppTask, IHistory, ILocation } from '@aurelia/runtime-html';
export const TestRouterConfiguration = {
    for(logLevel = 1 /* debug */) {
        return {
            register(container) {
                container.register(LoggerConfiguration.create({
                    level: logLevel,
                    colorOptions: 0 /* noColors */,
                    sinks: [ConsoleSink],
                }));
                const mockBrowserHistoryLocation = new MockBrowserHistoryLocation();
                container.register(Registration.instance(IHistory, mockBrowserHistoryLocation), Registration.instance(ILocation, mockBrowserHistoryLocation), AppTask.hydrating(IRouter, router => {
                    mockBrowserHistoryLocation.changeCallback = router['handlePopstate'];
                }));
            },
        };
    },
};
//# sourceMappingURL=configuration.js.map