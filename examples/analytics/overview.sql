-- Aggregate on the server and send only the result to the dashboard.
SELECT
  COUNT(DISTINCT c.id) AS total_contacts,
  COUNT(DISTINCT s.id) AS total_sessions,
  SUM(CASE WHEN s.status = 'resolved' THEN 1 ELSE 0 END) AS resolved_sessions,
  AVG(
    CASE
      WHEN s.ended_at IS NOT NULL
      THEN unixepoch(s.ended_at) - unixepoch(s.started_at)
    END
  ) AS average_duration_seconds
FROM contacts c
LEFT JOIN sessions s ON s.contact_id = c.id
WHERE s.started_at >= :period_start
  AND s.started_at < :period_end;

-- Distribution used by an intent chart.
SELECT
  intent,
  COUNT(*) AS message_count
FROM messages
WHERE role = 'user'
  AND intent IS NOT NULL
  AND created_at >= :period_start
  AND created_at < :period_end
GROUP BY intent
ORDER BY message_count DESC;
