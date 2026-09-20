export default function AdminLoading() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-5">

                {/* Pulsing logo/indicator */}
                <div className="relative flex items-center justify-center">
                    <div className="absolute h-16 w-16 rounded-full bg-primary/20 animate-ping" />

                    <div className="relative h-12 w-12 rounded-full bg-primary flex items-center justify-center shadow-md">
                        <div className="h-3 w-3 rounded-full bg-primary-foreground animate-pulse" />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <p className="text-foreground! font-medium!">
                        Loading
                    </p>

                    <span className="text-sm text-foreground-muted">
                        Just a sec...
                    </span>
                </div>

            </div>
        </div>
    )
}