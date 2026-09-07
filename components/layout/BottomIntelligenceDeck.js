"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomIntelligenceDeck = void 0;
const GeoIntelligenceConsole_1 = require("@/components/intelligence/GeoIntelligenceConsole");
const intel_panels_1 = require("@/components/intelligence/intel_panels");
const BottomIntelligenceDeck = ({ data, loading }) => {
    return (<div className="w-full min-h-[100svh] bg-[#0a0a0a] border-t border-[#222] p-4 font-mono relative">
      <div className="max-w-[1920px] mx-auto flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8 bg-[#0f0f0f] border border-[#222] rounded-md overflow-hidden shadow-lg h-[400px]">
            <GeoIntelligenceConsole_1.GeoIntelligenceConsole data={data} loading={loading}/>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4 max-h-[400px]">
            <intel_panels_1.LiveIntelligenceFeed data={data}/>
            <intel_panels_1.LiveStreamsPanel data={data}/>
          </div>
        </div>

        <div className="grid gap-4 auto-rows-min" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          <intel_panels_1.GlobalStockMarketsPanel data={data}/>
          <intel_panels_1.EnergyResourcesPanel data={data}/>
          <intel_panels_1.ContinentNewsGrid data={data}/>
          <intel_panels_1.SuperpowerTrackerPanel data={data}/>
          <intel_panels_1.live_panels.source_health data={data}/>
          <intel_panels_1.StrategicRiskOverview data={data}/>
          <intel_panels_1.ThreatTimeline data={data}/>
          <intel_panels_1.CrossSourceSignal data={data}/>
          <intel_panels_1.CountryInstabilityPanel data={data}/>
          <intel_panels_1.FearGreedPanel data={data}/>
          <intel_panels_1.CryptoPanel data={data}/>
          <intel_panels_1.MacroSignalsPanel data={data}/>
          <intel_panels_1.WorldClockPanel />
          <intel_panels_1.live_panels.conflict_humanitarian data={data}/>
          <intel_panels_1.live_panels.cyber_connectivity data={data}/>
          <intel_panels_1.live_panels.infrastructure_flow data={data}/>
          <intel_panels_1.live_panels.strategic_assets data={data}/>
          <intel_panels_1.live_panels.natural_climate data={data}/>
          <intel_panels_1.live_panels.sanctions_economic data={data}/>
          <intel_panels_1.live_panels.technology_watch data={data}/>
          <intel_panels_1.live_panels.resilience_progress data={data}/>
          <intel_panels_1.live_panels.live_correlations data={data}/>
          <intel_panels_1.live_panels.worldmonitor_panels data={data}/>
          <intel_panels_1.live_panels.intelligence_hotspots data={data}/>
          {intel_panels_1.layer_signal_panels.map(panel => (<intel_panels_1.LayerSignalPanel key={panel.id} data={data} {...panel}/>))}
        </div>
      </div>
    </div>);
};
exports.BottomIntelligenceDeck = BottomIntelligenceDeck;
