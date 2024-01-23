

import { EditorState } from 'draft-js';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Editor from '@draft-js-plugins/editor';
import createMentionPlugin, {
    defaultSuggestionsFilter,
  } from '@draft-js-plugins/mention';

import editorStyles from './DisplayUsers.css';
// import "draft-js-mention-plugin/lib/plugin.css";

const DisplayUsers = () => {
  
    const ref = React.createRef(Editor);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [mentions, setmentions ] = useState([ {
    name: 'dina',
    link: 'https://twitter.com/mrussell247',
    avatar:
      'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
  },
  {
    name: 'vinay',
    link: 'https://twitter.com/juliandoesstuff',
    avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
  }]);

  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState(mentions);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({
      mentionComponent(mentionProps) {
        return (
            <span
              className={mentionProps.className}
              // eslint-disable-next-line no-alert
              onClick={() => alert('Clicked on the Mention!')}
            >
              {mentionProps.children}
            </span>
          );
      },
    });
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ value }) => {
    setSuggestions(defaultSuggestionsFilter(value, mentions));
  }, []);
  
    return (
      <div className={editorStyles.editor}   onClick={() => {
        ref.current.focus();
      }}>
       <Editor
        editorKey={'editor'}
        editorState={editorState}
        onChange={setEditorState}
        plugins={plugins}
        ref={ref}
      />
      <MentionSuggestions
        open={open}
        onOpenChange={onOpenChange}
        suggestions={suggestions}
        onSearchChange={onSearchChange}
        onAddMention={() => {
          // get the mention object selected
        }}
      />
      </div>
    );
  };
  

export default DisplayUsers