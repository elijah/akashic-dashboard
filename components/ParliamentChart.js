"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ParliamentChart;
const react_1 = __importStar(require("react"));
const colorCache = {};
function getPartyColor(party) {
    if (colorCache[party])
        return colorCache[party];
    let hash = 0;
    for (let i = 0; i < party.length; i++) {
        hash = party.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash) % 360;
    const color = `hsl(${h}, 70%, 50%)`;
    colorCache[party] = color;
    return color;
}
function ParliamentChart({ text }) {
    const data = (0, react_1.useMemo)(() => {
        if (!text)
            return [];
        const parties = [];
        const semicolonFormat = text.split(';');
        let foundFormat = false;
        for (const chunk of semicolonFormat) {
            const m = chunk.trim().match(/^(.*?)\s*\((\d+)\)$/);
            if (m) {
                const name = m[1].trim();
                const seats = parseInt(m[2], 10);
                if (seats > 0 && name.toLowerCase() !== "none") {
                    parties.push({ name, seats, color: getPartyColor(name) });
                    foundFormat = true;
                }
            }
        }
        if (!foundFormat) {
            const match = text.match(/seats by party\s*-\s*([^;]+)/i) || text.match(/parties elected and seats per party[^:]*:\s*([^;]+)/i);
            if (match) {
                const chunks = match[1].split(',');
                for (const chunk of chunks) {
                    const m = chunk.trim().match(/^(.*?)\s+(\d+)$/);
                    if (m) {
                        const name = m[1].trim();
                        const seats = parseInt(m[2], 10);
                        if (seats > 0 && name.toLowerCase() !== "none") {
                            parties.push({ name, seats, color: getPartyColor(name) });
                        }
                    }
                }
            }
        }
        return parties.sort((a, b) => b.seats - a.seats);
    }, [text]);
    if (data.length === 0)
        return null;
    const totalSeats = data.reduce((sum, p) => sum + p.seats, 0);
    const renderLimit = 1000;
    const scaleFactor = totalSeats > renderLimit ? totalSeats / renderLimit : 1;
    return (<div className="mt-4 p-3 border border-m3-outline-variant/30 rounded bg-m3-surface-container-lowest/50">
            <div className="font-sans text-[0.6rem] font-bold text-m3-primary uppercase mb-2 flex justify-between">
                <span>PARLIAMENTARY COMPOSITION</span>
                <span>{totalSeats} SEATS</span>
            </div>
            
            
            <div className="flex flex-wrap gap-[3px] mb-4">
                {data.map((party) => {
            const renderDots = Math.ceil(party.seats / scaleFactor);
            return Array.from({ length: renderDots }).map((_, i) => (<div key={`${party.name}-${i}`} className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: party.color }} title={`${party.name}: ${party.seats} seats`}/>));
        })}
            </div>

            
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {data.map((party) => (<div key={party.name} className="flex items-center gap-1.5 text-[0.55rem] font-mono">
                        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: party.color }}/>
                        <span className="text-m3-on-surface truncate" title={party.name}>{party.name}</span>
                        <span className="text-m3-on-surface-variant ml-auto">{party.seats}</span>
                    </div>))}
            </div>
            
            {scaleFactor > 1 && (<div className="text-[0.45rem] text-m3-on-surface-variant italic text-right mt-2">
                    *Visual representation scaled for performance (1 dot = {Math.ceil(scaleFactor)} seats)
                </div>)}
        </div>);
}
