import { useStore } from "../store/useStore"
import { X, Upload, FileDown, Info } from "lucide-react"
import { useState, useRef } from "react"
import dayjs from "dayjs"

export default function ImportEventModal() {
    const [jsonInput, setJsonInput] = useState("")
    const [error, setError] = useState("")
    const fileInputRef = useRef(null)
    const isImportModalOpen = useStore(state => state.isImportModalOpen)
    const setImportModalOpen = useStore(state => state.setImportModalOpen)
    const importEvents = useStore(state => state.importEvents)

    const handleDownloadSample = () => {
        const sampleJson = {
            "2025-06-12": [
                {
                    "id": 1,
                    "title": "Sample Event",
                    "color": "#3B82F6",
                    "startTime": "10:00 AM",
                    "endTime": "11:00 AM"
                },
                {
                    "id": 2,
                    "title": "Another Event",
                    "color": "#8B5CF6",
                    "startTime": "2:00 PM",
                    "endTime": "3:00 PM"
                }
            ]
        }

        const blob = new Blob([JSON.stringify(sampleJson, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'calendar-events-sample.json'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            const text = await file.text()
            setJsonInput(text)
            setError("")
        } catch (err) {
            setError("Failed to read the file. Please try again.")
        }
    }

    const validateEventFormat = (events) => {
        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        return Object.entries(events).every(([date, dayEvents]) => {
            // Validate date format (YYYY-MM-DD)
            if (!dayjs(date, 'YYYY-MM-DD', true).isValid()) return false

            if (!Array.isArray(dayEvents)) return false
            return dayEvents.every(event =>
                event.id &&
                event.title &&
                event.color && hexColorRegex.test(event.color) &&
                event.startTime &&
                event.endTime &&
                typeof event.startTime === 'string' &&
                typeof event.endTime === 'string'
            )
        })
    }

    const handleImport = () => {
        if (!jsonInput.trim()) {
            setError("Please provide JSON data to import.")
            return
        }

        try {
            const parsedJson = JSON.parse(jsonInput)

            // Validate JSON structure
            if (!validateEventFormat(parsedJson)) {
                setError("Invalid JSON format. Each event must include: id, title, color (hex code), startTime, and endTime. Dates must be in YYYY-MM-DD format.")
                return
            }

            importEvents(parsedJson)
            setImportModalOpen(false)
            setJsonInput("")
            setError("")
        } catch (err) {
            setError("Invalid JSON format. Please check your input.")
        }
    }

    if (!isImportModalOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-background rounded-lg p-6 w-full max-w-lg">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Import Events from JSON</h2>
                    <button
                        onClick={() => setImportModalOpen(false)}
                        className="text-muted-foreground hover:text-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                        <input
                            type="file"
                            accept=".json"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="flex items-center justify-center space-x-2 w-full px-4 py-3 border-2 border-dashed border-border rounded-lg hover:bg-accent transition-colors"
                        >
                            <Upload className="w-5 h-5" />
                            <span>Upload JSON File</span>
                        </button>
                        <div className="relative">
                            <p className="absolute -top-3 left-4 bg-background px-2 text-xs text-muted-foreground">
                                Or paste JSON directly
                            </p>
                            <textarea
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                placeholder="Paste your JSON here..."
                                className="w-full h-48 p-3 text-sm font-mono bg-muted rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring border border-border"
                            />
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-destructive">{error}</p>
                    )}

                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => setImportModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleImport}
                            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                        >
                            Import
                        </button>
                    </div>

                    <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                        <div className="flex items-start space-x-2">
                            <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    Required JSON format:
                                    <br />• Group events by date in YYYY-MM-DD format
                                    <br />• Each event needs: id, title, color, startTime, endTime
                                    <br />• Color must be a valid hex code (e.g., "#3B82F6")
                                    <br />• Times should be in "h:mm A" format (e.g., "10:00 AM")
                                </p>
                                <button
                                    onClick={handleDownloadSample}
                                    className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80"
                                >
                                    <FileDown className="w-4 h-4" />
                                    <span>Download Sample Template</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 