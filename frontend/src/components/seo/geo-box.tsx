interface GeoBoxProps {
  profession: string;
  hobby?: string;
  toolCount: number;
  freeToolCount?: number;
  primaryGoal: string;
  avgCost: number;
  updatedAt: string;
}

/**
 * GEO Direct Answer Box
 * 针对 AI 搜索引擎优化的"倒金字塔"结构
 * 重要信息在前 100 字内
 */
export function GeoBox({
  profession,
  hobby,
  toolCount,
  freeToolCount = 3,
  primaryGoal,
  avgCost,
  updatedAt,
}: GeoBoxProps) {
  return (
    <div className="geo-box bg-blue-50 dark:bg-blue-950/30 p-4 border-l-4 border-primary rounded-r-lg mt-4 mb-6">
      <p className="text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
        This is a <strong>free, personalized AI toolkit</strong> for{" "}
        <strong>{profession}s</strong>
        {hobby && (
          <>
            {" "}
            who enjoy <strong>{hobby}</strong>
          </>
        )}
        . It contains <strong>{toolCount} tools</strong> ({freeToolCount} free)
        optimized for <strong>{primaryGoal}</strong>. Average monthly cost:{" "}
        <strong>${avgCost}</strong>. Last updated: <strong>{updatedAt}</strong>.
      </p>
      <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
        Curated by MaxMate SmartMatch™ Technology • Processed over 1M+ tool
        matches
      </p>
    </div>
  );
}

