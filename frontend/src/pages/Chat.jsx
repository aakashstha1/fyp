"use client"

import React, { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const initialUsers = ["User 1", "User 2", "User 3"]

const initialGroups = [
  {
    name: "Project",
    members: ["XX", "YY", "XXX"],
    messages: [
      { from: "XX", text: "God did", timestamp: 1685948400000 },
      { from: "YY", text: "Ok, got it.", timestamp: 1685948500000 },
    ],
  },
  {
    name: "Project Team",
    members: ["Alice", "Bob", "You"],
    messages: [
      { from: "Alice", text: "Deploy today?", timestamp: 1685948600000 },
      { from: "You", text: "Yes, on it.", timestamp: 1685948700000 },
    ],
  },
]

export default function Chat() {
  const [activeTab, setActiveTab] = useState("Home")
  const [selectedUser, setSelectedUser] = useState(initialUsers[0])
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [showGroupMembers, setShowGroupMembers] = useState(null)

  const [messagesByUser, setMessagesByUser] = useState(() => {
    const initial = {}
    const now = Date.now()
    initialUsers.forEach((user, i) => {
      initial[user] = [
        { from: "them", text: `Hello! This is ${user}.`, timestamp: now - (i + 1) * 60000 },
      ]
    })
    return initial
  })

  const [groups, setGroups] = useState(initialGroups)
  const [newMessage, setNewMessage] = useState("")
  const scrollRef = useRef(null)

  const handleSend = () => {
    if (!newMessage.trim()) return
    const timestamp = Date.now()
    if (activeTab === "Chat" && selectedUser) {
      setMessagesByUser((prev) => {
        const updated = { ...prev }
        updated[selectedUser] = [
          ...(updated[selectedUser] || []),
          { from: "me", text: newMessage, timestamp },
        ]
        return updated
      })
    } else if (activeTab === "Group" && selectedGroup) {
      setGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.name === selectedGroup.name
            ? {
                ...group,
                messages: [...group.messages, { from: "You", text: newMessage, timestamp }],
              }
            : group
        )
      )
    }
    setNewMessage("")
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }, [messagesByUser, selectedUser, groups, selectedGroup, activeTab])

  const getLastMessage = (messages) => {
    if (!messages || messages.length === 0) return { text: "No messages", timestamp: 0 }
    const last = messages[messages.length - 1]
    return {
      text: (last.from === "me" || last.from === "You" ? "You: " : `${last.from}: `) + last.text,
      timestamp: last.timestamp,
    }
  }

  const activityList = React.useMemo(() => {
    const userActivity = initialUsers.map((user) => {
      const lastMsg = getLastMessage(messagesByUser[user])
      return {
        type: "user",
        id: user,
        name: user,
        avatarLetter: user[0],
        lastMessage: lastMsg.text,
        lastTimestamp: lastMsg.timestamp,
      }
    })

    const groupActivity = groups.map((group) => {
      const lastMsg = getLastMessage(group.messages)
      return {
        type: "group",
        id: group.name,
        name: group.name,
        avatarLetter: group.name[0],
        lastMessage: lastMsg.text,
        lastTimestamp: lastMsg.timestamp,
        members: group.members,
      }
    })

    return [...userActivity, ...groupActivity].sort(
      (a, b) => b.lastTimestamp - a.lastTimestamp
    )
  }, [messagesByUser, groups])

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setShowGroupMembers(null)
    if (tab !== "Group") setSelectedGroup(null)
    if (tab !== "Chat") setSelectedUser(initialUsers[0])
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      {/* Tabs Sidebar */}
      <div className="w-16 bg-gray-200 dark:bg-zinc-800 flex flex-col items-center py-4 space-y-4 border-r border-gray-300 dark:border-zinc-700 shadow-md">
        {["Home", "Chat", "Group"].map((item) => (
          <button
            key={item}
            onClick={() => handleTabChange(item)}
            className={cn(
              "w-12 h-12 flex items-center justify-center rounded-full text-xs font-medium shadow transition-all",
              activeTab === item
                ? "bg-primary text-white dark:bg-indigo-600"
                : "bg-white dark:bg-zinc-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-zinc-600"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Contact List */}
      <div className="w-64 border-r border-gray-300 dark:border-zinc-700 p-4 space-y-4 bg-gray-50 dark:bg-zinc-900 overflow-y-auto">
        {activeTab === "Home" &&
          activityList.map((item) => (
            <div key={item.id} className="space-y-1">
              <div
                className={cn(
                  "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors select-none",
                  selectedUser === item.id || selectedGroup?.name === item.id
                    ? "bg-primary text-white dark:bg-indigo-600"
                    : "hover:bg-gray-300 dark:hover:bg-zinc-700"
                )}
                onClick={() => {
                  setShowGroupMembers(null)
                  if (item.type === "user") {
                    setSelectedUser(item.id)
                    setActiveTab("Chat")
                    setSelectedGroup(null)
                  } else if (item.type === "group") {
                    setSelectedGroup(groups.find((g) => g.name === item.id))
                    setActiveTab("Group")
                    setSelectedUser(null)
                  }
                }}
              >
                <Avatar className="w-10 h-10 flex-shrink-0">
                  <AvatarFallback>{item.avatarLetter}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="font-semibold truncate">{item.name}</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
                    {item.lastMessage}
                  </span>
                </div>
                {item.type === "group" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowGroupMembers(showGroupMembers === item.id ? null : item.id)
                    }}
                    className="text-xs px-2 py-1 rounded bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-600 transition"
                  >
                    {showGroupMembers === item.id ? "Hide" : "Members"}
                  </button>
                )}
              </div>

              {item.type === "group" && showGroupMembers === item.id && (
                <div className="pl-16 pr-3 py-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-zinc-800 rounded-b-md">
                  Members: {item.members.join(", ")}
                </div>
              )}
            </div>
          ))}

        {activeTab === "Chat" &&
          initialUsers.map((user) => (
            <div
              key={user}
              onClick={() => setSelectedUser(user)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors select-none",
                user === selectedUser
                  ? "bg-primary text-white dark:bg-indigo-600"
                  : "hover:bg-gray-300 dark:hover:bg-zinc-700"
              )}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback>{user[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium truncate">{user}</span>
            </div>
          ))}

        {activeTab === "Group" &&
          groups.map((group) => (
            <div
              key={group.name}
              onClick={() => setSelectedGroup(group)}
              className={cn(
                "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors select-none",
                selectedGroup?.name === group.name
                  ? "bg-primary text-white dark:bg-indigo-600"
                  : "hover:bg-gray-300 dark:hover:bg-zinc-700"
              )}
            >
              <Avatar className="w-10 h-10 flex-shrink-0">
                <AvatarFallback>{group.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium truncate">{group.name}</span>
            </div>
          ))}
      </div>

      {/* Chat View */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-gray-300 dark:border-zinc-700 px-6 flex items-center gap-4 bg-gray-50 dark:bg-zinc-900">
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarFallback>
              {activeTab === "Chat"
                ? selectedUser?.[0]
                : activeTab === "Group"
                ? selectedGroup?.name?.[0]
                : ""}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">
              {activeTab === "Chat" ? selectedUser : selectedGroup?.name || ""}
            </h2>
            {activeTab === "Group" && selectedGroup && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Members: {selectedGroup.members.join(", ")}
              </p>
            )}
          </div>
        </div>

        <ScrollArea ref={scrollRef} className="flex-1 p-4 space-y-3 overflow-y-auto">
          {activeTab === "Chat" &&
            selectedUser &&
            (messagesByUser[selectedUser] || []).map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex max-w-[60%] px-3 py-2 rounded-lg whitespace-pre-wrap",
                  msg.from === "me"
                    ? "ml-auto bg-indigo-600 text-white dark:bg-indigo-500"
                    : "bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-gray-100",
                  "mb-2"
                )}
              >
                {msg.text}
              </div>
            ))}

          {activeTab === "Group" &&
            selectedGroup &&
            selectedGroup.messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "max-w-[70%] px-3 py-2 rounded-lg whitespace-pre-wrap",
                  msg.from === "You"
                    ? "ml-auto bg-indigo-600 text-white dark:bg-indigo-500"
                    : "bg-gray-300 dark:bg-zinc-700 text-gray-900 dark:text-gray-100",
                  "mb-2"
                )}
              >
                <strong>{msg.from}:</strong> {msg.text}
              </div>
            ))}
        </ScrollArea>

        {(activeTab === "Chat" || activeTab === "Group") && (
          <div className="flex gap-2 border-t border-gray-300 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <Button onClick={handleSend}>Send</Button>
          </div>
        )}
      </div>
    </div>
  )
} 