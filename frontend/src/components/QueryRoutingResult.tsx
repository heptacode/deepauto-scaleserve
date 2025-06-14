import { useState } from 'react';
import CloseSVG from '../assets/icons/close.svg';
import { QueryRouting } from '../types';
import { Badge } from './Badge';

const MAX_SCORE = 5.0;

export function QueryRoutingResult({ queryRouting }: { queryRouting: QueryRouting['query_routing'] }) {
  const [isShow, setIsShow] = useState<boolean>(false);

  return !isShow ? (
    <button
      type="button"
      className="text-sm underline underline-offset-2 cursor-pointer"
      onClick={() => setIsShow(true)}
    >
      See Scores
    </button>
  ) : (
    <div className="absolute top-10 right-10 w-full max-w-xs p-4 text-gray-900 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <h2 className="text-lg font-semibold">Query Routing Result</h2>
        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white justify-center items-center text-xl shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          aria-label="Close"
          onClick={() => setIsShow(false)}
        >
          <CloseSVG className="w-3 h-3" />
        </button>
      </div>

      <div className="flex mb-3">
        <Badge>
          Selected Model:&nbsp;<strong>{queryRouting?.selected_model}</strong>
        </Badge>
      </div>

      {queryRouting?.grades.map(grade => {
        const widthPercent = `${(grade.score / MAX_SCORE) * 100}%`;
        const isSelected = grade.model === queryRouting?.selected_model;
        const barColor = isSelected ? 'bg-green-500' : 'bg-gray-400';

        return (
          <div key={grade.model} className="w-full rounded bg-gray-100">
            <div
              className={`p-1 pl-2.5 rounded transition-all text-xs ${isSelected ? 'text-gray-800' : 'text-gray-200'} ${barColor}`}
              style={{ width: widthPercent }}
            >
              {grade.model} ({grade.score.toFixed(2)})
            </div>
          </div>
        );
      })}
    </div>
  );
}
