import React from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (value: string) => void;
  tags: string[];
  activeTags: string[];
  onToggleTag: (tag: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  query,
  onQueryChange,
  tags,
  activeTags,
  onToggleTag,
}) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type="search"
        value={query}
        placeholder="Search cards..."
        onChange={(e) => onQueryChange(e.target.value)}
        style={{
          width: '100%',
          padding: '0.6rem 0.9rem',
          border: '1px solid #cbd5e1',
          borderRadius: 8,
        }}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.6rem' }}>
        {tags.map((tag) => {
          const active = activeTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => onToggleTag(tag)}
              style={{
                padding: '0.2rem 0.7rem',
                borderRadius: 999,
                border: '1px solid',
                borderColor: active ? '#2563eb' : '#cbd5e1',
                background: active ? '#2563eb' : '#fff',
                color: active ? '#fff' : '#334155',
                cursor: 'pointer',
                fontSize: '0.8rem',
              }}
            >
              #{tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
